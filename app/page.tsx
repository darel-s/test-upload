// page.tsx
"use client";

import { useState } from "react";

export default function Home() {
    const [file, setFile] = useState<File>();

    const onSubmit = async (file: File) => {
        if (!file) return;

        try {
            const data = new FormData();
            data.set("file", file);

            const res = await fetch("/api/upload", {
                method: "POST",
                body: data,
            });
            // handle the error
            if (!res.ok) throw new Error(await res.text());
        } catch (e: any) {
            // Handle errors here
            console.error(e);
        }
    };

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setFile(file);
        if (file) {
            onSubmit(file);
        }
    };

    return (
        <form>
            <input type="file" name="file" onChange={onFileChange} />
        </form>
    );
}
