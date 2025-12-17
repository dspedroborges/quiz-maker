import { parseRichText } from "../utils/functions";

export default function TextDisplay({ text }: { text: string }) {
    return (
        <span className="block" dangerouslySetInnerHTML={{ __html: parseRichText(text) }} />
    )
}