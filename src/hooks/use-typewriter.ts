    import { useEffect, useState } from "react";

    export function useTypewriterLoop(
    text: string,
    options?: {
    typeSpeed?: number;
    deleteSpeed?: number;
    pauseAfterType?: number;
    pauseAfterDelete?: number;
    startDelay?: number;
    }
    ) {
    const {
    typeSpeed = 110,
    deleteSpeed = 55,
    pauseAfterType = 1400,
    pauseAfterDelete = 400,
    startDelay = 700,
    } = options ?? {};

    const [displayed, setDisplayed] = useState("");

    useEffect(() => {
    let i = 0;
    let phase: "typing" | "pausing-full" | "deleting" | "pausing-empty" = "typing";
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
        if (phase === "typing") {
        i += 1;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
            phase = "pausing-full";
            timeoutId = setTimeout(tick, pauseAfterType);
        } else {
            timeoutId = setTimeout(tick, typeSpeed);
        }
        } else if (phase === "pausing-full") {
        phase = "deleting";
        timeoutId = setTimeout(tick, deleteSpeed);
        } else if (phase === "deleting") {
        i -= 1;
        setDisplayed(text.slice(0, i));
        if (i <= 0) {
            phase = "pausing-empty";
            timeoutId = setTimeout(tick, pauseAfterDelete);
        } else {
            timeoutId = setTimeout(tick, deleteSpeed);
        }
        } else if (phase === "pausing-empty") {
        phase = "typing";
        timeoutId = setTimeout(tick, typeSpeed);
        }
    };

    const startId = setTimeout(tick, startDelay);

    return () => {
        clearTimeout(startId);
        clearTimeout(timeoutId);
    };
    }, [text, typeSpeed, deleteSpeed, pauseAfterType, pauseAfterDelete, startDelay]);

    return { displayed };
    }