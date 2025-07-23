"use client";

import { useState, type CSSProperties } from "react";
import { Button, Label, ListBox, ListBoxItem, Popover, Select, SelectValue, type Key } from "react-aria-components";
import "./MotionPreview.css";

interface MotionPreviewProps {
    durations: { name: string; value: string }[];
    easings: { name: string; value: string }[];
}

function MotionPreview({ durations, easings }: MotionPreviewProps) {
    const [isAnimated, setAnimated] = useState(false);
    const [duration, setDuration] = useState("hop-easing-duration-1");
    const [easing, setEasing] = useState("hop-easing-expressive");
    const handleClick = () => {
        setAnimated(!isAnimated);
    };

    const handleSelectDuration = (selected: Key) => {
        setDuration(selected.toString());
    };

    const handleSelectEasing = (selected: Key) => {
        setEasing(selected.toString());
    };

    return (
        <>
            <div className="hd-motion-preview">
                <Select className="hd-motion-preview__select" placeholder="Easing" aria-label="Easing" defaultSelectedKey={easing} onSelectionChange={handleSelectEasing}>
                    <Label>Easing</Label>
                    <Button className="hd-motion-preview__select-button">
                        <SelectValue />
                        <span aria-hidden="true">▼</span>
                    </Button>
                    <Popover className="hd-motion-preview__popover">
                        <ListBox>
                            {easings.map(x => (
                                <ListBoxItem key={x.name} id={x.name}>
                                    {x.name.replace("hop-easing-", "").replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                                </ListBoxItem>
                            ))}
                        </ListBox>
                    </Popover>
                </Select>

                <Select className="hd-motion-preview__select" placeholder="Duration" aria-label="Duration" defaultSelectedKey={duration} onSelectionChange={handleSelectDuration}>
                    <Label>Duration</Label>
                    <Button className="hd-motion-preview__select-button">
                        <SelectValue />
                        <span aria-hidden="true">▼</span>
                    </Button>
                    <Popover className="hd-motion-preview__popover">
                        <ListBox>

                            {durations.map(x => (
                                <ListBoxItem key={x.name} id={x.name}>
                                    {`${x.name.replace("hop-easing-", "").replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())} (${x.value})`}
                                </ListBoxItem>
                            ))}
                        </ListBox>
                    </Popover>
                </Select>

                <Button className="hd-motion-preview__button" onPress={handleClick}>Play this motion</Button>
            </div>
            <div
                style={{
                    "--hd-duration": durations.find(x => x.name === duration)?.value,
                    "--hd-easing": easings.find(x => x.name === easing)?.value
                } as CSSProperties}
                className={`hd-object ${isAnimated ? "hd-object-animated" : ""}`}
            />
        </>
    );
}

export default MotionPreview;
