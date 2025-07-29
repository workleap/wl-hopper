import { getMigrationNotes } from "@/app/components/utils.ts";

export interface MigrateGuideProps {
    src: string;
}

const MigrateGuide = async ({ src }: MigrateGuideProps) => {
    // return <div />;

    if (!src) {
        return null;
    }

    const { content } = await getMigrationNotes(src);

    return <div>
        {content}
    </div>;
};

export default MigrateGuide;
