import { createModal } from "./buildModal.js";
import { translations,getCurrentLang } from "./settings.js";

function checkInput(value){
    const lang=getCurrentLang();
    const t=translations[lang];
    const inputValue =value.trim();
    if(inputValue === ''){
        createModal({
            title: t.alertTitle,
            body: t.alertEmpty
        });
        return false;
    }else if(!/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/.test(inputValue)) {
        createModal({
            title: t.alertTitle,
            body:t.alertInvalid
        });
        return false;
    }
    return true;
}

export {checkInput}