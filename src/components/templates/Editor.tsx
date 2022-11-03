import "./editor.css";
import { useEffect, useRef, useState } from "react";
import EditorJS, { LogLevels, OutputData } from "@editorjs/editorjs";
import Header from "@editorjs/header";

const DEFAULT_INITIAL_DATA = () => {
  return {
    time: new Date().getTime(),
    blocks: [
      {
        type: "header",
        data: {
          text: "This is my awesome editor!",
          level: 1,
        },
      },
    ],
  };
};

const EDITTOR_HOLDER_ID = "editorjs";

const Editor = (props: any) => {
  const ejInstance = useRef<EditorJS | null>(null);
  const [editorData, setEditorData] = useState<OutputData>(DEFAULT_INITIAL_DATA);

  // This will run only once
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
      autofocus: true,
      tools: {
        header: Header,
      },
    });
  };

  return <div className="prose lg:prose-lg xl:prose-xl prose-sm bg-white px-3 mx-3 rounded-lg shadow w-full md:w-[46.25rem]" id={EDITTOR_HOLDER_ID}></div>;
};

export default Editor;
