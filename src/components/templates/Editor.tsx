import "./editor.css";
import { useEffect, useRef, useState } from "react";
import EditorJS, { BlockToolConstructable, LogLevels, OutputData } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "../../GraphQL/Mutations";

const DEFAULT_INITIAL_DATA = () => {
  return {
    time: new Date().getTime(),
    blocks: [
      {
        type: "header",
        data: {
          text: "Title here...",
          version: 3,
        },
      },
      {
        type: "paragraph",
        data: {
          text: "Content here...",
        },
      },
    ],
  };
};

const EDITTOR_HOLDER_ID = "editorjs";

const Editor = () => {
  const ejInstance = useRef<EditorJS | null>(null);
  const [editorData, setEditorData] = useState<OutputData>(DEFAULT_INITIAL_DATA);
  const [createPost, { error }] = useMutation(CREATE_POST);

  const handleSave = async () => {
    const outputData = await ejInstance?.current?.save();
    let title;

    for (let i = 0; i < outputData!.blocks.length; i++) {
      if (outputData?.blocks[i].type === "header" && outputData.blocks[i].data.level === 3) {
        title = outputData.blocks[i].data.text;
        break;
      }
    }
    const slug = Slugify(title);
    createPost({
      variables: {
        article: JSON.stringify(outputData),
        slug,
        tags: [],
      },
    });
  };

  useEffect(() => {
    if (!ejInstance.current) {
      initEditor();
    }
    return () => {
      ejInstance?.current?.destroy();
      ejInstance.current = null;
    };
  }, []);

  const initEditor = () => {
    const editor = new EditorJS({
      holder: EDITTOR_HOLDER_ID,
      logLevel: "VERBOSE" as LogLevels,
      data: editorData,
      onReady: () => {
        ejInstance.current = editor;
      },
      onChange: async () => {
        let content = await editor.saver.save();
        // Put your logic here to save this data to your DB
        setEditorData(content);
      },
      tools: {
        header: {
          class: Header as unknown as BlockToolConstructable,
          config: {
            placeholder: "Title here...",
            defaultLevel: 3,
          },
        },
      },
    });
  };

  return <div className="xl:prose-xl lg:prose-lg md:prose-base prose-sm prose bg-white px-3 rounded-lg shadow !max-w-[43.75rem] md:px-[1.25rem]" id={EDITTOR_HOLDER_ID}></div>;
};

function Slugify(title: string) {
  return title
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export default Editor;
