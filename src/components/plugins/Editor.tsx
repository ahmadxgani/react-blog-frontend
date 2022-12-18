// @ts-nocheck
import "./editor.css";
import { useEffect, useRef, useState } from "react";
import EditorJS, { BlockToolConstructable, LogLevels, OutputData } from "@editorjs/editorjs";
import ImageTool from "@editorjs/image";
import Header from "@editorjs/header";
import { EditorProps } from "../../lib/types";
import { useMutation } from "@apollo/client";
import { Mutation } from "../../../generated-types";
import { UPLOAD_IMAGE } from "../../GraphQL/Mutations";

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
  const [uploadImage] = useMutation<Mutation>(UPLOAD_IMAGE);

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
        handleData({
          title,
          content: JSON.stringify(outputData),
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
        image: {
          class: ImageTool,
          config: {
            uploader: {
              async uploadByFile(file) {
                try {
                  const response = await uploadImage({
                    variables: {
                      file,
                    },
                  });
                  return {
                    success: 1,
                    file: {
                      url: response.data?.uploadFile.url,
                    },
                    stretched: true,
                    types: "image/png, image/jpg",
                  };
                } catch (error) {
                  console.log(error);
                  return {
                    success: 0,
                  };
                }
              },
            },
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

export default Editor;
