"use client";

import { useEffect, useRef } from "react";
import { Spinner } from "spin.js";
import "spin.js/spin.css";

export default function Loadingoverlay() {
    const overlayRef = useRef(null);

    useEffect(() => {
        if (overlayRef.current) {
            const spinner = new Spinner({
                color: "#4e82a5", 
                lines: 8
            }).spin(overlayRef.current);

            return () => spinner.stop();
        }
    }, []);

    return <div ref={overlayRef} className="g-loading-overlay" />
}