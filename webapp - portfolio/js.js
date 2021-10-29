$(function() {
  var elem = $("#settings");

  $(document).on("click", function(e) {
      if(!$(e.target).hasClass('start-button')) {
        elem.slideUp();
      }
  });

  function openSettings() {
    elem.slideDown();
  }


  $("#settings-button").on("click.show", openSettings);

  elem.click(function(e) {
    e.stopPropagation();
  });

	$(".slide-toggle").click(function() {
    $("#settings1").animate({
      width: "toggle"
    });
  });

});

function createWindow({id, content, title, windowStatus, onWindowClose, style = {}}) {
  const _style = {
      width: 550,
      height: 262,
      left: 444,
      top: 253,
      display: 'block',
      ...style
  }

  const $section = $(`<section class="app">`)
  $section.css(_style);


	$section.click(function (){
		const zIndex = $section.css('z-index')
		console.log({
			zIndex
		})
	  $section.css('z-index', zIndex + 1)
	});



  $section.attr('id', id);
  $section.html(`
  <header class="titlebar">
  <div class="title">
    <div class="pull-right close" >
      <button class="minimize" id="minimize1"><span class="fa fa-minus"></span></button>
      <button class="expand"><span class="fa fa-square-o"></span></button>
      <button class="times" id="times1"><span class="fa fa-times"></span></button>
    </div>
    <h1>
      <div class="icon-my-computer">${title}</div>
    </h1>
  </div>
  <ul class="toolbar">
    <li><u>F</u>ile</li>
    <li><u>E</u>dit</li>
    <li><u>V</u>iew</li>
    <li><u>H</u>elp</li>
  </ul>
</header>
<nav class="toolbars-container">
  <div class="toolbar menubar has-grip">
    <div class="statusbar">
      <div class="left">${windowStatus}</div>
    </div>
  </div>
</nav>
<div class="window-content">${content}</div>
`);
const $close = $('.close button.times', $section);
$close.click(onWindowClose);
const $minimize = $('.close button.minimize', $section);
$minimize.click(function (e) {
  e.preventDefault();
  $($section).hide();
});

  return $section;
}

function createStartButton({id, title}) {
  const $button = $('<button class="start-button-pages">');
  $button.attr('id', id);
  $button.text(title);
  return $button;
}

function attachWindowWithButton($window, $startButton) {
  $startButton.click(function (e) {
    e.preventDefault();
    if($($window).is(':visible')) {
      $($window).hide();
    } else {
      $($window).show();
    }
  });
}

function showWindowOnDesktop($window, $startButton) {
  const $desktop = $('.desktop');
  $desktop.append($window);

  const $startMenu = $('.menu-starter');
  $startMenu.append($startButton);
}

function createWindowAndShowOnDesktop({
  id,
  title,
  content,
  windowStatus,
  windowStyle
}) {
  if($(`section#${id}`).length) {
    return;
  }

  const $startButton = createStartButton({
    id: id,
    title: title,
  });

  const $window = createWindow({
    id: id,
    title: title,
    windowStatus: windowStatus,
    content: content,
    style: windowStyle,
    onWindowClose: function(e) {
      e.preventDefault();
      $($window).remove();
      $($startButton).remove();
    }
  });

    $($window).draggable({ handle: '.titlebar' });
    $($window).click(function() {
      $($window).removeClass('active');
      $(this).addClass('active');
    });

  attachWindowWithButton($window, $startButton);

  showWindowOnDesktop($window, $startButton);

}

function closeStart() {
  const $elem = $("#settings");
  $elem.slideUp();
}

createWindowAndShowOnDesktop({
  id: 'myWork',
  title: 'My Work',
  content: `
	<div class='work-container' id='work-container'>
		<a class='worktext' href='#'>
			<img class='work' src='media/amazon logo.png' alt='Amazon'>
			<p class='worktext'>Amazon</p>
		</a>
	</div>

	<div class='work-container'
		<a class='worktext' href='#'>
			<img class='work' src='media/pngaaa.com-4173356.png' alt='DoS'>
			<p class='worktext'>Deloitte</p>
		</a>
	</div>

	<div class='work-container'>
		<a class='worktext' href='https://fcawitech.com'>
			<img class='work' src='media/fcalogo.jpeg' alt='FCA'>
			<p class='worktext'>FCA</p>
		</a>
	</div>
	`,
  windowStatus: '3 items',
  windowStyle: {
		width: 550,
		height: 262,
    left: 495,
		top: 327,
		display: 'block',
		position: 'fixed',
  }
});


createWindowAndShowOnDesktop({
  id: 'readmedoc',
  title: 'Readme',
  content: `
	<div class="readme">
		<h3>Welcome to my portfolio</h3>
		<div class="readme-text">
			<p style="font-size:12px">
				I'm a UX designer. My current portfolio is a Windows95
				operating system theme. I chose this OS because it was one of the first OS I operated on.
				At the same time, I was clicking through the Windows95 emulator, appreciating the
				easy/simple usability it had. It is still a work in progress; I will be updating it
				with new features.
			</p>
			<h5 style="margin-bottom:0">Existing Features:</h5>
			<p style="font-size:12px">
				Resizing windows (bottom right corner) <br>
				Dragging windows <br>
				Responsive windows tab when closing out <br>
				Closing/opening out of windows
			</p>

			<h5 style="margin-bottom:0">Future features:</h5>
			<p style="font-size:12px">
				Creating a Windows95 mobile theme <br>
				Maximizing windows <br>
				Creating a WebGL classic game <br>
				Adding a feedback input field
			</p>

	</div>
	`,
  windowStatus: 'Readme',
  windowStyle: {
		width: 390,
		height: 502,
		left: 10,
		top: 4,
		display: 'block',
		position: 'fixed'
  }
});

createWindowAndShowOnDesktop({
  id: 'resume',
  title: 'My Resume',
  content: `<iframe src="media/anasmorsi_resume_2021.pdf" style="width:100%"></iframe>`,
  windowStatus: 'Updated resume',
  windowStyle: {
		width: 550,
		height: 262,
		left: 489,
		top: 23,
		display: 'block',
		position: "fixed"
  }
});
