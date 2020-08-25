(() => {
    let yOffset = 0;
    let prevScrollHeight = 0;
    let currentScene = 0;

    const sceneInfo = [
        {
            type: "sticky",
            scaleFactor: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector("#scroll-section-1"),
            },
        },
        {
            type: "normal",
            scaleFactor: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector("#scroll-section-2"),
            },
        },
        {
            type: "sticky",
            scaleFactor: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector("#scroll-section-3"),
            },
        },
        {
            type: "sticky",
            scaleFactor: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector("#scroll-section-4"),
            },
        },
    ];

    function setLayout() {
        for (let scene of sceneInfo) {
            scene.scrollHeight = scene.scaleFactor * window.innerHeight;
            scene.objs.container.style.height = `${scene.scrollHeight}px`;
        }

        yOffset = window.pageYOffset;
        let totalScrollHeight = 0;
        for (let i = 0; i < sceneInfo.length; i++) {
            totalScrollHeight += sceneInfo[i].scrollHeight;
            if (totalScrollHeight >= yOffset) {
                currentScene = i;
                break;
            }
        }
        document.body.setAttribute("id", `show-scene-${currentScene + 1}`);
    }

    function scrollLoop() {
        prevScrollHeight = 0;
        for (let i = 0; i < currentScene; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }

        if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
            currentScene++;
            document.body.setAttribute("id", `show-scene-${currentScene + 1}`);
        }

        if (yOffset < prevScrollHeight) {
            // 모바일에서 맨 위에서 스크롤 위로 당겼을 시 마이너스 대비
            if (currentScene === 0) return;
            currentScene--;
            document.body.setAttribute("id", `show-scene-${currentScene + 1}`);
        }
    }

    window.addEventListener("scroll", () => {
        yOffset = window.pageYOffset;
        scrollLoop();
    });
    window.addEventListener("load", setLayout);
    window.addEventListener("resize", setLayout);
})();
