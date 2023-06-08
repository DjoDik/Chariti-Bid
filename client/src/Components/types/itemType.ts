export type ItemType = {
    category_id: number,
    user_id: number,
    price: number,
    title: string,
    body: string,
    uuid: string,
    city: string,
    sellStatus: boolean,
    lastUser_id: number,
    name:string,
    id:number
    Items: ItemType[];
    img: string
}

export type ItemStateSlice = {
    allProduct:ItemType[]
}