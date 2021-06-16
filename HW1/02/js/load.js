function checkRepeats(arg) {
    const scripts = document.querySelectorAll('script');
    if (typeof arg === 'string') {
        scripts.forEach((script) => {
            if (script.attributes[0].value === arg)
                return false;
        });
        return arg;
    } else if (typeof arg === 'object') {
        let newArg = [];
        scripts.forEach((elm) => {
            newArg = arg.filter((arg) => arg !== elm.attributes[0].value)
        });
        if (newArg.length === 0) {
            return false;
        } else {
            return newArg;
        }
    }
}

checkRepeats();

function loadScript(arg, argEx = false) {
    let expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    let regex = new RegExp(expression);

    if (typeof arg === 'function') { // ежели вы изволили функцию ввести
        arg();
    } else if (typeof arg === 'string') { // ежели душа ваша в сторону строки склонилась
        console.log('строка');
        arg = checkRepeats(arg);
            if (arg.match(regex)) {
                const element = document.createElement("script");
                element.type = "text/javascript";
                element.src = arg;
                if (typeof argEx === 'function') // помимо строки, функцию коллбэка соблаговолили указать
                    argEx();
                document.body.appendChild(element);
            } else {
                alert('Error: String is not a URL or it exists');
            } //но тут ошибочка вкралась, мастер

    } else if (Array.isArray(arg)) { // ежели массив указали
        console.log('массив');
        arg.forEach((url) => {
            if (url.match(regex)) {
                const element = document.createElement("script");
                element.type = "text/javascript";
                element.src = arg;
                if (typeof argEx === 'function')
                    arg();
                document.body.appendChild(element);
            } else {
                alert(`Error: String ${url} is not a URL or it already exists`);
            }//но тут ошибочка вкралась, мастер
        })
    }


}