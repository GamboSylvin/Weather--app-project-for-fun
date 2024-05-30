export const authentication = {
    nameErrorMessage1 : new Error("Please enter atmost 2 names").message,
    nameErrorMessage2 : new Error("Names can only be 2 letters atleast").message ,
    passwordErrorMessage1 : new Error("Passwords should contain minimum 6 alaphanumerical characters").message,
    isInvalidName: false,
    isGoodPassword : false,
    isStrongPassword : false,
    isVeryStrongPassword : false,
    nameAuthentication(name){
        let Name = name.split(' ');
        if (Name.length > 2){
            this.isInvalidName= true;
            return this.nameErrorMessage1;
        }else if(Name.length > 1) {
            if((/^[a-z]{2,}$/i.test(Name[0])) && (/^[a-z]{2,}$/i.test(Name[1]))){
                this.isInvalidName= false;
                Name[0] = Name[0].charAt(0).toUpperCase() + Name[0].slice(1)
                Name[1] = Name[1].charAt(0).toUpperCase() + Name[1].slice(1)
                return Name.join(' ');
            }else{
                this.isInvalidName= true;
                return this.nameErrorMessage2;
            }
        }else{
            if (/^[a-z]{2,}$/i.test(Name[0])){
                this.isInvalidName= false;
                return Name[0].charAt(0).toUpperCase() + Name[0].slice(1)
            }else{
                this.isInvalidName= true;
                return this.nameErrorMessage2;
            }
        }
    },
    passwordAuthentication(password){
        if (!(/^(?=.*[a-zA-Z])(?=.*\d).{6,}$/.test(password))){
            this.isGoodPassword = false;
            return this.passwordErrorMessage1;
        }else {
            this.isGoodPassword = true
            if (/^.*[A-Z].*$/.test(password)){  
                this.isStrongPassword = true;
            } else{
                this.isStrongPassword = false;
            }
        }
        let Password = password.split('');

        for (let i = 0; i < Password.length-2; i++) {
            if ((isNaN(Password[i]) && !isNaN(Password[i+1]) && isNaN(Password[i+2])) || (!isNaN(Password[i]) && isNaN(Password[i+1]) && !isNaN(Password[i+2])) ){
                this.isVeryStrongPassword = true; 
                break
            } else {
                this.isVeryStrongPassword = false;
               }
        }
            return {
                isStrong: this.isStrongPassword,
                isVeryStrong : this.isVeryStrongPassword,
            }
        
    },
    emailAuthentication(email){
        if (/^[a-z0-9._%+-]+@[a-z0-9.-]\.[a-z]{2,7}$/i.test(email)){
            return true
        }else{
            return false
        }
    },
}