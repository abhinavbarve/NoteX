window.onload = function () {

    let notes = document.getElementById("notes")
    let noteValue = document.getElementById("notes").value
    let noteTitle = document.getElementById("noteTitle").value

    let icons = document.getElementById("icons");

    let iconNames = ["cut", "copy", "paste", "select-all", "delete", "save", "undo", "redo"];
	for(let i = 0; i < iconNames.length; i++) {
		let icon = document.createElement("img");
		icon.src = "https://img.icons8.com/metro/26/000000/" + iconNames[i] + ".png";
		icon.id = iconNames[i];
		icon.className = "icon";
		icon.title = iconNames[i].substring(0, 1).toUpperCase() + iconNames[i].substring(1);
		icon.draggable = false;
		icon.tabIndex = 0;
		icon.onkeydown = (evt)=> {
			if(evt.which==13) // enter
				icon.onclick();
        }
        icons.appendChild(icon);
    }
    
    document.getElementById("cut").onclick = () => {
        notes.focus();
        document.execCommand("cut");
    }
    document.getElementById("copy").onclick = () => {
        notes.focus();
        document.execCommand("copy");
    }
    document.getElementById("paste").onclick = () => {
        notes.focus();
        document.execCommand("paste");
    }
    document.getElementById("select-all").onclick = () => {
        notes.focus();
        notes.select();
    }
    document.getElementById("delete").onclick = () => {
        notes.focus();
        document.execCommand("delete");
    }
    

    document.getElementById("undo").onclick = ()=> {
        notes.focus();
        document.execCommand("undo");
    }
    document.getElementById("redo").onclick = ()=> {
        notes.focus();
        document.execCommand("redo");
    } 
    

    document.getElementById("save").onclick = ()=> {
        notes.focus();
        let saveName
        let title = localStorage.getItem(noteTitle)
        console.log(title)
        if (localStorage.getItem(noteTitle) != "") {
            saveName = "One-(NoteX).txt"
        } else {
            saveName = "NoteX_untitled.txt"
        }
		let file = {
			url: "data:application/," + 
				encodeURIComponent(notes.value.replace(/\r?\n/g, '\r\n') ),
            filename: saveName
		}
		chrome.downloads.download(file);
	}
    
    if (localStorage) {
        
        notes.title = localStorage.getItem("noteTitle");
        notes.value = localStorage.getItem("noteValue");
		
		notes.style.width = localStorage.getItem("noteWidth") + "px";
		notes.style.height = localStorage.getItem("noteHeight") + "px";
	}
    
    document.onmouseup = storeSize;

    function storeSize() {
        if (localStorage) {
            localStorage.setItem("noteWidth", notes.clientWidth);
            localStorage.setItem("noteHeight", notes.clientHeight);
        }
    }

}