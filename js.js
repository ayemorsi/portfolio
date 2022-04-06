function createWindow({
  id,
  content,
  title,
  windowStatus,
  onWindowClose,
  onWindowExpand,
  style = {}
}) {
  const _style = {
    width: 'auto',
    height: 'auto',
    bottom: 32,
    top: 0,
    display: 'block',
    position: 'fixed',

    //
    // width: 550,
    // height: 262,
    // left: 444,
    // top: 253,
    // display: 'block',
    ...style
  }

  const $section = $(`<section class="app">`)
  $section.css(_style);


  $section.click(function() {
    let zIndex = findMaxZIndex() +1 ;

      console.log( {zIndex})
    $section.css('z-index', zIndex)
  });



  $section.attr('id', id);
  $section.html(`
  <header class="titlebar">
  <div class="title">
    <div class="pull-right close expand" >
      <button class="minimize" id="minimize1"><span class="fa fa-minus"></span></button>
      <button class="square" id="square1"><span class="fa fa-square-o"></span></button>
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

  const $expand = $('.expand button.square', $section);
  $expand.click(function(e) {
    e.preventDefault();
    $($section).toggleClass('fullscreen');
  });

  const $minimize = $('.close button.minimize', $section);
  $minimize.click(function(e) {
    e.preventDefault();
    $($section).hide();
  });

  return $section;
}

function createStartButton({
  id,
  title
}) {
  const $button = $('<button class="start-button-pages">');
  $button.attr('id', id);
  $button.text(title);
  return $button;
}

function attachWindowWithButton($window, $startButton) {
  $startButton.click(function(e) {
    e.preventDefault();
    if ($($window).is(':visible')) {
      $($window).hide();
    } else {
      $($window).show();
    }
  });
}

function showWindowOnDesktop($window, $startButton) {
  const $desktop = $('.desktop');
  const zIndex = findMaxZIndex() + 1;
  $($window).css('z-index', zIndex);
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
  if ($(`section#${id}`).length) {
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
    },
    onWindowExpand: function(e) {
      e.preventDefault();
      $($window).remove();
      $($startButton).remove();
    }
  });
  $($window).draggable({
    handle: '.titlebar'
  });
  $($window).click(function() {
    $($window).removeClass('active');
    $(this).addClass('active');
  });
  attachWindowWithButton($window, $startButton);
  showWindowOnDesktop($window, $startButton);
}

// function closeStart() {
//   const $elem = $("#settings");
//   $elem.slideUp();
// }


// createWindowAndShowOnDesktop({
//   id: 'myWork',
//   title: 'My Work',
//   content: `
//
//   <div class='work-container'>
// 		<a class='worktext' href='#'>
// 			<img class='work' src='media/ZoomScriptslogo.png' alt='ZC'>
// 			<p class='worktext'>ZoomScript</p>
// 		</a>
// 	</div>
//
//
// 	`,
//   windowStatus: '4 items',
//   windowStyle: {
//     width: 550,
//     height: 262,
//     left: 495,
//     top: 310,
//     display: 'block',
//     position: 'fixed',
//   }
// });

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
				<strike>Maximizing windows</strike> <br>
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

function handleZCIconClick() {
  createWindowAndShowOnDesktop({
    id: 'zc1',
    title: 'ZC',
    content: `<iframe src='media/zc.pdf' style='width:100%'></iframe>`,
    windowStatus: 'ZoomScript',
    windowStyle: {
      width: 550,
      height: 262,
      left: 357,
      top: 100,
      display: 'block',
      position: 'fixed'
    }
  });
}

function handleMHSIconClick() {
  createWindowAndShowOnDesktop({
    id: 'MHS',
    title: 'MHS',
    content: `<iframe src='media/MHS_Final_Brand-Guideline.pdf' style='width:100%'></iframe>`,
    windowStatus: 'MHS',
    windowStyle: {
      width: 550,
      height: 262,
      left: 257,
      top: 119,
      display: 'block',
      position: 'fixed'
    }
  });
}

function handleAZIconClick() {
  createWindowAndShowOnDesktop({
    id: 'AZ',
    title: 'AZ',
    content: `<iframe src='/Users/anasmorsi/github/portfolio/amazon.html' name='myFrame' style='width:100%'></iframe>`,
    windowStatus: 'Amazon',
    windowStyle: {
      width: 550,
      height: 262,
      left: 257,
      top: 119,
      display: 'block',
      position: 'fixed'
    }
  });
}
// createWindowAndShowOnDesktop({
//   id: 'resume',
//   title: 'My Resume',
//   content: `<iframe src="media/resume_2021.pdf" style="width:100%"></iframe>`,
//   windowStatus: 'Updated resume',
//   windowStyle: {
//     width: 550,
//     height: 262,
//     left: 489,
//     top: 23,
//     display: 'block',
//     position: 'fixed'
//   }
// });
//
