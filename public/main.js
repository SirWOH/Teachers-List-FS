var late = document.getElementsByClassName("fa-clock-o");
var trash = document.getElementsByClassName("fa-trash");

Array.from(late).forEach(function(element) {
      element.addEventListener('click', function(){
        const date = this.parentNode.parentNode.childNodes[1].innerText
        const name = this.parentNode.parentNode.childNodes[3].innerText
        const late = parseFloat(this.parentNode.parentNode.childNodes[7].innerText)
        fetch('alists', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
            'late': late
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});


Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const date = this.parentNode.parentNode.childNodes[1].innerText
        const name = this.parentNode.parentNode.childNodes[3].innerText
        const late = parseFloat(this.parentNode.parentNode.childNodes[7].innerText)
        fetch('alists', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name,
            'date': date,
            'late': late
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
