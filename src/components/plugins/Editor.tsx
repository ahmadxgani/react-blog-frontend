import "./editor.css";
import { useEffect, useRef, useState } from "react";
import EditorJS, { BlockToolConstructable, LogLevels, OutputData } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import { EditorProps } from "../../lib/types";

const DEFAULT_INITIAL_DATA = (content?: null | string) => {
  return content
    ? JSON.parse(content)
    : {
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

const Editor = ({ handleData, content = null }: EditorProps) => {
  const ejInstance = useRef<EditorJS | null>(null);
  const [editorData, setEditorData] = useState<OutputData>(() => DEFAULT_INITIAL_DATA(content));

  useEffect(() => {
    if (!ejInstance.current) {
      initEditor();
    }
    return () => {
      ejInstance?.current?.destroy();
      ejInstance.current = null;
    };
  }, []);

  useEffect(() => {}, []);

  useEffect(() => {
    (async () => {
      const outputData = await ejInstance?.current?.save();

      if (outputData) {
        let title;

        for (let i = 0; i < outputData!.blocks.length; i++) {
          if (outputData?.blocks[i].type === "header" && outputData.blocks[i].data.level === 3) {
            title = outputData.blocks[i].data.text;
            break;
          }
        }
        const slug = Slugify(title);
        handleData({
          title,
          content: JSON.stringify(outputData),
          slug,
        });
      }
    })();
  }, [editorData]);

  const initEditor = () => {
    const editor = new EditorJS({
      holder: EDITTOR_HOLDER_ID,
      logLevel: "VERBOSE" as LogLevels,
      data: editorData,
      onReady: () => {
        ejInstance.current = editor;
      },
      onChange: async () => {
        const content = await editor.saver.save();
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

  return (
    <>
      <div className="xl:prose-xl lg:prose-lg md:prose-base prose-sm prose bg-white px-3 rounded-lg shadow !max-w-[43.75rem] md:px-[1.25rem]" id={EDITTOR_HOLDER_ID}></div>
    </>
  );
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
