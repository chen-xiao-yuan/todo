const header = document.querySelector('.header')
const mainInput = document.querySelector('#mainInput')
const main = document.querySelector('.main')
const footer = document.querySelector('.footer')
const activeItemCount = document.querySelector('.activeItemCount')
const all = document.querySelector('.all')
const active = document.querySelector('.active')
const completed = document.querySelector('.completed')
const clearCompleted = document.querySelector('.clear')


//当有任务时，显示尾部和主输入框的箭头；没有则隐藏
function clear() {
    if (main.innerHTML !== '') {
        footer.style.display = 'block'
        header.classList.add('icon')
    } else {
        footer.style.display = 'none'
        header.classList.remove('icon')
    }
}

//记录未完成信息的条数
let messageCount = 0
let sum = 0

//按下回车，记录信息,并清空主输入框的内容，记录信息条数
mainInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && mainInput.value.trim() !== '') {
        messageCount++
        main.innerHTML += `<div class="item" data-id="${++sum}">
                            <div class="content">${mainInput.value}</div>
                            <div class="error" data-id="${sum}">×</div>
                            </div>`
        activeItemCount.innerHTML = `${messageCount} items left`
        localStorage.setItem('todos', main.innerHTML)
        mainInput.value = ''
        localStorage.setItem('sum', sum)
        localStorage.setItem('messageCount', messageCount)
    }
    clear()
})

//实现元素的本地存储，刷新之后显示数据
window.addEventListener('DOMContentLoaded', function (e) {
    let getSaved = this.localStorage.getItem('todos')
    sum = Number(this.localStorage.getItem('sum')) || 0
    messageCount = Number(this.localStorage.getItem('messageCount')) || 0
    if (getSaved) {
        main.innerHTML = getSaved
    }
    if (messageCount != 0) {
        activeItemCount.innerHTML = `${messageCount} items left`
        clear()
    }
    console.log(main.innerHTML)
    console.log(localStorage.getItem('todos'))
    console.log(document.querySelector('.error'))
})

//点击圆圈添加删除线，并更改圆圈颜色以及背景色,再次点击时恢复;删除信息，再次记录信息条数
main.addEventListener('click', function (e) {
    let target = e.target
    //点击叉号删除信息，同时更新本地存储的信息,修改显示信息的数量
    if (target.classList.contains('error')) {
        e.stopPropagation()
        const item = document.querySelector(
            `.item[data-id="${target.dataset.id}"]`,
        )
        main.removeChild(item)
        messageCount--
        localStorage.setItem('messageCount', messageCount)
        activeItemCount.innerHTML = `${messageCount} items left`
        localStorage.setItem('todos', main.innerHTML)
        if(messageCount == 0) {
            clear()
        }
        return
    }
    const underlineItem = document.querySelector(
        `div[data-id="${target.dataset.id}"]`,
    )
    //添加类名（删除线）
    underlineItem.classList.toggle('underline')
    //给圆圈改颜色
    underlineItem.classList.toggle('circleChange')
    underlineItem.classList.toggle('bgcChange')
    localStorage.setItem('todos', main.innerHTML)
})

// 点击all展示未删除的全部信息
all.addEventListener('click', function () {
    const saved = localStorage.getItem('todos')
    main.innerHTML = saved
})

// 点击active显示未完成的信息
active.addEventListener('click', function () {
    const saved = localStorage.getItem('todos')
    const templeDiv = document.createElement('div')
    templeDiv.innerHTML = saved
    const allItems = templeDiv.querySelectorAll('.item')
    main.innerHTML = ''
    allItems.forEach(function (e) {
        if(!e.classList.contains('underline')) {
            main.appendChild(e)
        }
    })
})

// 点击completed显示已完成的信息
completed.addEventListener('click', function () {
    //得到的是字符串
    const saved = localStorage.getItem('todos')
    const templeDiv = document.createElement('div')
    templeDiv.innerHTML = saved
    const allItems = templeDiv.querySelectorAll('.item')
    main.innerHTML = ''
    allItems.forEach(function (e) {
        if(e.classList.contains('underline')) {
            main.appendChild(e)
        }
    })
})

// 点击clear Completed清除所有的信息
clearCompleted.addEventListener('click', function () {
    main.innerHTML = ''
    localStorage.setItem('todos', main.innerHTML)
    messageCount = 0
    localStorage.setItem('messageCount', messageCount)
    sum = 0
    localStorage.setItem('sum', sum)
    clear()
})