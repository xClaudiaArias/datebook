const dropDownBtn = document.querySelector(".drop-down")
const navigation = document.getElementById('navigation')

dropDownBtn.addEventListener('click', () => {
    navigation.classList.toggle("show-nav")
    // navigation.style.display = "block"
})