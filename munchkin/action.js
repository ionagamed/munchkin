import * as global from './munchkin.js';
import { wield, use, cast } from './events.js';

export function actionAttack() {

}

export function actionSmivka() {

}

export function buttonWield() {
    global.create_cards_on = false;
	global.buttonExit.visible = false;
    if (wield != undefined) wield.destroy();
    if (use != undefined) use.destroy();
    if (cast != undefined) cast.destroy();
    console.log(global.curCard);
    global.create_cards_on = true;
}

export function buttonUse(argument) {
    global.create_cards_on = false;
	global.buttonExit.visible = false;
    if (wield != undefined) wield.destroy();
    if (use != undefined) use.destroy();
    if (cast != undefined) cast.destroy();
    global.create_cards_on = true;
}

export function buttonCast(argument) {
    global.create_cards_on = false;
	global.buttonExit.visible = false;
    if (wield != undefined) wield.destroy();
    if (use != undefined) use.destroy();
    if (cast != undefined) cast.destroy();
    global.create_cards_on = true;
}