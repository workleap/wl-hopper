import type { FC, ReactNode } from "react";

export interface Item {
    id: string;
    name: ReactNode;
    type: ReactNode;
    defaultValue: string;
    description: ReactNode;
    required: boolean;
}

interface ColoredDefaultValueProps {
    defaultValue: string;
}

const ColoredDefaultValue: FC<ColoredDefaultValueProps> = ({ defaultValue }) => {
    const isBoolean = defaultValue === "true" || defaultValue === "false";
    const formattedValue = defaultValue.toString();

    const style = {
        color: isBoolean ? "var(--hd-color-accent-text)" : "var(--hd-color-primary-text)"
    };

    return <span style={style}>{formattedValue}</span>;
};

export const PropTableRender = ({ items }: { items: Item[] }) => {
    return (
        <div className="hd-table hd-props-table">
            <div className="hd-props-table__tbody">
                {items.map(({ id, name, type, defaultValue, description, required }) => (
                    <div key={id} className="hd-table__row hd-props-table__row">
                        <div className="hd-table__cell hd-props-table__cell hd-props-table__col-nameAndType">
                            <div className="hd-props-table__description-term">
                                <div className="hd-props-table__name">
                                    {name}
                                    {!required && "?"}
                                </div>
                                <div className="hd-props-table__type">{type}</div>
                            </div>
                        </div>
                        <div className="hd-table__cell hd-props-table__cell hd-props-table__col-descriptionAndDefault">
                            <div className="hd-props-table__description-list">
                                <div className="hd-props-table__description">{description}</div>
                                {defaultValue !== "" && (
                                    <div className="hd-props-table__default-value">
                                        <em>
                                            Defaults to <ColoredDefaultValue defaultValue={defaultValue} />.
                                        </em>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
