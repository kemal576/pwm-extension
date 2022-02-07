/*var btn = document.createElement('button')
btn.innerText = "BUTON"
btn.id = "btnpw"

document.querySelector('body')?.appendChild(btn);

btn.addEventListener('click', () => {
    alert("BUTONA BASTIN!")
});*/


var email = document.querySelector('input[name="email"]')
var password = document.querySelector('input[name="password"]')

if (email != null && password != null) {
    (email as HTMLInputElement).value = "test_username";
    (password as HTMLInputElement).value = "test_password";
}
console.info("Injection Complete!");
