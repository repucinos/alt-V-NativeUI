import Size from "../utils/Size.mjs";
import Rectangle from "./Rectangle.mjs";
import { Screen } from "../utils/Screen.mjs";

import * as game from 'natives';
export default class Container extends Rectangle {
    constructor(pos, size, color) {
        super(pos, size, color);
        this.Items = [];
    }
    addItem(item) {
        this.Items.push(item);
    }
    Draw(offset) {
        if (!this.enabled)
            return;
        offset = offset || new Size();
        const screenw = Screen.width;
        const screenh = Screen.height;
        const height = 1080.0;
        const ratio = screenw / screenh;
        const width = height * ratio;
        const w = this.size.Width / width;
        const h = this.size.Height / height;
        const x = (this.pos.X + offset.Width) / width + w * 0.5;
		const y = (this.pos.Y + offset.Height) / height + h * 0.5;
		game.drawRect(x, y, w, h, this.color.R, this.color.G, this.color.B, this.color.A, false);
        for (var item of this.Items)
            item.Draw(new Size(this.pos.X + offset.Width, this.pos.Y + offset.Height));
    }
}
