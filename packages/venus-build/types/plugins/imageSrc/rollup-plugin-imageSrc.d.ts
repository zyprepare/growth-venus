export default function image(opts?: {}): {
    name: string;
    load(id: any): string | null;
};
