export function getContent(){
    const data = document.forms['url-form']['url'].value;
    document.getElementById('demo').innerHTML = data;   
}