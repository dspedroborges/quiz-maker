export default function Content({ content }: { content: { type: "text" | "image" | "audio" | "video" | "youtube", value: string } }) {
    return (
        <>
            {
                (content.type == "audio") && (
                    <audio controls>
                        <source src={content.value} type="audio/mpeg" />
                        <source src={content.value} type="audio/ogg" />
                    </audio>
                )
            }

            {
                (content.type == "video") && (
                    <video controls>
                        <source src={content.value} type="video/mp4" />
                        <source src={content.value} type="video/webm" />
                    </video>
                )
            }

            {
                (content.type == "youtube") && (
                    <iframe
                        width={300}
                        height={250}
                        src={`https://www.youtube.com/embed/${content.value.split("v=")[1] ?? ""}?si=0pLW10vXf9fJEpwX`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                    />
                )
            }

            {
                (content.type == "image") && (
                    <img src={content.value} />
                )
            }

            {
                (content.type == "text") && (
                    <div className="flex items-center justify-center w-full">
                        {
                            content.value.split("\n").map((line, i) => {
                                return <p key={i}>{line}</p>
                            })
                        }
                    </div>
                )
            }
        </>
    )
}