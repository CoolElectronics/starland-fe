import { w100 } from "./css";
import { Post } from "./Post"

export type PostTree = DLComponent<{
    id: string
}>

let tcss = css`
self {
    border-top: 1px solid var(--accent);
    padding-top: 1em;
}
`;
export function PostTree(this: PostTree) {
    this.css = tcss;

    // api/v1/statuses/AewePz6DKs0pNKk5DM/context

    return (
        <div class={[w100]}>
            <Post id={this.id} timestamp={new Date} />
        </div>
    )
}