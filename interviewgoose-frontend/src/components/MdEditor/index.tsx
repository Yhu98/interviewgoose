import { Editor } from "@bytemd/react";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import "bytemd/dist/index.css";
import "highlight.js/styles/vs.css";
import "./index.css";

interface Props {
    value?: string;
    onChange?: (v: string) => void;
    placeholder?: string;
}

const plugins = [gfm(), highlight()];

/**
 * Markdown Editor
 * @param props
 * @constructor
 */
const MdEditor = (props: Props) => {
    const { value = "", onChange, placeholder } = props;

    return (
        <div className="md-editor">
            <Editor
                value={value || ""} //compatible with null content and answer
                placeholder={placeholder}
                mode="split"
                plugins={plugins}
                onChange={onChange}
            />
        </div>
    );
};

export default MdEditor;
