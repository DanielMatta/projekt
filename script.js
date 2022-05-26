const listItem = document.querySelector(".todotask")
// console.log(listItem);
const editButton = document.querySelector(".edit")
const deleteButton = document.querySelector(".delete")
const isChecked = document.querySelector("#checkbox:checked")


// listItem.addEventListener("mouseover", () => {

//     setTimeout(() => { editButton.style.display = "inline-block"; }, 450);

// })
// listItem.addEventListener("mouseleave", () => {
//     setTimeout(() => { editButton.style.display = "none"; }, 450);

// })

// listItem.addEventListener("mouseover", () => {
//     setTimeout(() => { deleteButton.style.display = "inline-block"; }, 450);

// })
// listItem.addEventListener("mouseleave", () => {
//     setTimeout(() => { deleteButton.style.display = "none"; }, 450);

// })

function test(event) {
    console.log(event.target.checked)
    if (event.target.checked) {
        listItem.style.textDecoration = "line-through"
    } else {
        listItem.style.textDecoration = "none"
    }


}