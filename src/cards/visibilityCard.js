// visibility card

export default class Visibility {
    constructor(visibility, visibilityCheck){
        this._visibility = visibility
        this._visibilityCheck = visibilityCheck

    }
    get visibility(){
        return this._visibility
    }
    set visibility(value){
        this._visibility = value;
    }
    get visibilityCheck(){
        return this._visibilityCheck
    }
    set visibilityCheck(value){
        this._visibilityCheck = value;
    }
    #getVisibilityCheckNumber(visibility){
        if(visibility <= 6){
            this.visibilityCheck = 0
        }else if(visibility>6 && visibility<=10){ 
            this.visibilityCheck = 1
        }else if (visibility>11 && visibility<=15){
            this.visibilityCheck = 2
        }else if (visibility>16 && visibility<=20){
            this.visibilityCheck = 3
        }else if(visibility>21){
            this.visibilityCheck = 4
        }
    }
    getVisibility(Data){
        this.visibility = Data?.data?.values?.visibility
        return  Math.ceil(this.visibility*1.60934)
    }
    displayVisibilityMessage(visibility){
        this.#getVisibilityCheckNumber(visibility)
        let visibilityMessages = [
            "The visibility is poor",
            "The view is fair enough",
            "safe view out there",
            "Wow! it's really clear",
            "perfectly clear view",
        ]
        switch (this.visibilityCheck) {
            case 0:
                return visibilityMessages[0];
            case 1:
                return visibilityMessages[1];
            case 2:
                return visibilityMessages[2];
            case 3:
                return visibilityMessages[3];
            case 4:
                return visibilityMessages[4];
            default:
                return "";
        }
    }
}