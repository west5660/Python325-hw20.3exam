// слайды
$(document).ready(function(){
	function jCarousel(obj, block, item) {
		var parent = $(obj).parents(),
			items  = parent.find(block + ' ' + item);
			options = {
				speed: 500,
			};

		liFirst = parent.find(block + ' ' + item + ':eq(0)');
		if(liFirst.is(':animated')) {
			return;
		}

		parent.find(block + ' ' + item).stop(true, true);

		if ($(obj).hasClass('carousel-arrow__prev')) {

			liFirst.find('i').animate({
				top: items.eq(1).find('i').css('top')
			}, options.speed);

			items.eq(1).find('i').animate({
				top: items.eq(0).find('i').css('top')
			}, options.speed);

			liFirst.animate({
				marginRight: 0 - liFirst.width()
			}, options.speed, function() {
				liFirst.css('margin-right', 0).appendTo(liFirst.parent());
			});
		} else {
			liFirst = parent.find(block + ' ' + item + ':eq(0)');
			liFirst.animate({
				marginLeft: 0 - liFirst.width()
			}, function() {
				liFirst.css('margin-left', 0).appendTo(liFirst.parent());
			}, options.speed);
		}

		// меняем текст отзывов
		curr = items.eq(1)[0].dataset;
		review = $(obj).parents('.carousel');
		$.each(curr, function( key, value ) {
			review.find('.carousel-content__' + key).text(value);
		});


		items.each(function(i,elem) {
			$(elem).attr('data-id',i+1);
		});
	}

	$(document).on('click', '.carousel-arrow__prev, .carousel-arrow__next', function(e) {
		jCarousel(this,'.carousel-box','.carousel-box__item');
	});
});
// форма
let forma = document.getElementById('form1');

forma.onsubmit = f1;

function f1() {
  let stroka = '';
  let selectedRadio = {};

  for (let i = 0; i < forma.elements.length; i++) {
    let elem = forma.elements[i];

    if (elem.type == 'checkbox' && elem.checked) {
      stroka += elem.name + ' -- выбран\n';
    } else if (elem.type == 'radio') {
      if (elem.checked) {
        selectedRadio[elem.name] = elem.value;
      }
    } else if (elem.type != 'submit' && elem.type != 'reset') {
      if (elem.value !== undefined) {
        stroka += elem.name + ' -- ' + elem.value + '\n';
      }
    }
  }

  for (let name in selectedRadio) {
    stroka += name + ' -- ' + selectedRadio[name] + '\n';
  }

  console.log(stroka);
  // saveToPC(stroka);
  // sendemail(stroka)
	 telegram(stroka)
  return false;
}

function saveToPC(str) {
  let blob = new Blob([str], {type: 'text/plain'});
  let link = document.createElement('a');
  link.setAttribute('href', URL.createObjectURL(blob));
  link.setAttribute('download', 'zakaz.txt');
  link.click();
}
// menu
const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('ol');

menuBtn.addEventListener('click', () => {
  menu.classList.toggle('show');
});

function sendemail(str) {
str=str.replaceAll('/n', '<br>')
    Email.send({
        SecureToken: "a4958d00-922d-4850-a6d4-66fc2abb5a48",
        To: 'westw_56@mail.ru',
        From: "westw_56@mail.ru",
        Subject: "test email",
        Body: str
    })
	alert('ok')
}
bot = 't.me/west60bot'
token = '6148037034:AAGylTPYhWbrZce8J4aCULQF2x7Qns1zv5k'
chatid = '825113753'
function telegram(str){
let z=$.ajax({
type: "POST",
url: "https://api.telegram.org/bot"+token+"/sendMessage?chat_id="+chatid,
data: "parse_mode=HTML&text="+encodeURIComponent(str),
}).then(alert('отправили в тг') )
}