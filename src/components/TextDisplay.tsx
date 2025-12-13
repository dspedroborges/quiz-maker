import { parseRichText } from "../utils/functions";

export default function TextDisplay({ text }: { text: string }) {
    return (
        <div dangerouslySetInnerHTML={{ __html: parseRichText(text) }} />
    )
}