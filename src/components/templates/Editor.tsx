import "./editor.css";
import { useEffect, useRef, useState } from "react";
import EditorJS, { BlockToolConstructable, LogLevels, OutputData } from "@editorjs/editorjs";
import Header from "@editorjs/header";

const DEFAULT_INITIAL_DATA = () => {
  return {
    time: new Date().getTime(),
    blocks: [
      {
        type: "header",
        data: {},
      },
    ],
  };
};

const EDITTOR_HOLDER_ID = "editorjs";

const Editor = () => {
  const ejInstance = useRef<EditorJS | null>(null);
  const [editorData, setEditorData] = useState<OutputData>(DEFAULT_INITIAL_DATA);

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

  return <div className="xl:prose-xl lg:prose-lg md:prose-base prose-sm prose bg-white px-3 mx-3 rounded-lg shadow w-full md:w-[43.75rem] md:px-[1.25rem]" id={EDITTOR_HOLDER_ID}></div>;
};

export default Editor;
