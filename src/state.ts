export const state: {
    user: Account | null
} = stateful({
    user: {}
});


const API = "/api";

export type Account = {
    [key: string]: any
    acct: string
    id: string
    url: string
    username: string
    avatar: string
    pleroma: {
        favicon: string
    }
}
export type Attachment = {
    blurhash: string
    description: string
    id: string
    meta: any
    pleroma: { mime_type: string }
    preview_url: string
    remote_url: string
    text_url: string
    type: "image"
    url: string
}
export type Status = {
    [key: string]: any
    created_at: string
    id: string
    account: Account
    mentions: Account[]
    in_reply_to_id: string | null
    in_reply_to_account_id: string | null
    media_attachments: Attachment[]
    reblog: Status | null
};

export type KnownStatus = Stateful<{
    object: Stateful<Status>
    key: string
}>

export const statuses: Map<string, KnownStatus> = new Map;

export type KnownAccount = Stateful<{
    account: Account,
    id: string
}>

export const accounts: Map<string, KnownAccount> = new Map;


(window as any).a = statuses;


export function parseStatus(object: Status): KnownStatus {
    const { id } = object;

    for (let acc of object.mentions) {
        parseAccount(acc);
    }

    if (statuses.has(id)) {
        let tl = statuses.get(id)!;
        tl.object = stateful(object);
        return tl;
    } else {
        let withstate = stateful({
            key: id,
            object: stateful(object),
        });
        statuses.set(id, withstate);
        return withstate;
    }
}
export function parseAccount(account: Account): KnownAccount {
    const { id } = account;

    if (accounts.has(id)) {
        let acct = accounts.get(id)!;
        acct.account = stateful(account);
        return acct;
    } else {
        let withstate = stateful({
            id,
            account: stateful(account),
        });
        accounts.set(id, withstate);
        return withstate;
    }
}