window.onload = Window_Onload;

function Window_Onload() {
    $(".Controller").children().click(ControllerItem_MouseClick);
    $(".Myself").click(Myself_MouseClick);
    $(".Menu").children().click(MenuItem_MouseClick);
    InitializeBackground();
    setTimeout(() => { HideCurtain(); }, 2000);
    setTimeout(() => { InitializeContent(); }, 3200);
}

function HideCurtain() {
    $(".Curtain").css("opacity", "0");
    $(".Curtain img").css("opacity", "0");
    setTimeout(() => { $(".Curtain").css("z-index", "-2"); }, 1000);
}

function ShowCurtain() {
    $(".Curtain").css({
        "z-index": "1",
        "opacity": "1"
    });
    setTimeout(() => { $(".Curtain img").css("opacity", "1"); }, 700);
}

function InitializeBackground() {
    var BackgroundItems = $(".Background").children();
    for (var i = 0; i < BackgroundItems.length; i++) {
        $(BackgroundItems[i]).css({
            "z-index": -1 * (i + 1),
            "top": i * 200 + "px"
        });
    }
}

function InitializeContent() {
    var ContentItems = $(".Content").children();
    for (var i = 1; i < ContentItems.length; i++)
        $(ContentItems[i]).css("z-index", -1 * i);
    $(ContentItems[0]).css({
        "z-index": 0,
        "opacity": 1
    });
}

function ControllerItem_MouseClick(e) {
    if ($(e.target).hasClass("Selected") == false) {
        var ControllerItems = $(".Controller").children();
        var Src, Dst;
        for (var i = 0; i < ControllerItems.length; i++) {
            if ($(ControllerItems[i]).hasClass("Selected") == true) {
                Src = i;
                $(ControllerItems[i]).removeClass("Selected");
                $(ControllerItems[i]).addClass("Unselected");
            }
            if (ControllerItems[i] == e.target) {
                Dst = i;
                $(e.target).removeClass("Unselected");
                $(e.target).addClass("Selected");
            }
        }
        BackgroundAnimation(Dst, Src);
        ContentAnimation(Dst, Src);
    }
}

function BackgroundAnimation(Dst, Src) {
    var BackgroundItems = $(".Background").children();
    var Temp;
    if (Src < Dst) {
        Temp = Dst - Src;
        for (var i = Src; i < Dst; i++) {
            $(BackgroundItems[i]).css({
                "height": "0%",
                "top": Temp * (-200) + "px"
            });
            Temp--;
        }
        $(BackgroundItems[Dst]).css("top", "0px");
    }
    else if (Src > Dst) {
        Temp = 0;
        for (var i = Dst; i < Src; i++) {
            $(BackgroundItems[i]).css({
                "height": "100%",
                "top": Temp * (200) + "px"
            });
            Temp++;
        }
        $(BackgroundItems[Src]).css("top", Temp * (200) + "px");
    }
}

function ContentAnimation(Dst, Src) {
    var ContentItems = $(".Content").children();
    $(ContentItems[Src]).css({
        "opacity": "0",
        "z-index": -1 * (Src + 1)
    });
    setTimeout(() => {
        $(ContentItems[Dst]).css({
            "opacity": "1",
            "z-index": 0
        });
    }, 500);
}

function Myself_MouseClick() {
    ShowCurtain();
    setTimeout(() => { document.location.href = "..\\index.php"; }, 800);
}

function MenuItem_MouseClick(e) {
    var MenuItems = $(".Menu").children();
    var Id;
    for (var i = 0; i < MenuItems.length; i++) {
        if (MenuItems[i] == e.target) {
            Id = i;
            break;
        }
    }
    ShowCurtain();
    if (Id == 0)
        setTimeout(() => { document.location.href = "..\\index.php"; }, 800);
    //...
}