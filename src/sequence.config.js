const ANIMATION_SEQUENCE = (design, elements) => [
    [
        2000,
        3000,
        new ColorAnimation({
            from: design.colors.blue,
            to: design.colors.darkBlue,
            onChange: backgroundColor => DomHelper.attachStyle(elements.homeJumbotron, { backgroundColor })
        })
    ],
    [
        2000,
        3000,
        new SizeAnimation({
            from: design.sizes.homeHeight,
            to: design.sizes.height,
            onChange: height => DomHelper.attachStyle(elements.homeJumbotron, { height }),
            onComplete: () => Array.prototype.forEach.call(elements.sectionsAndHr, section => section.parentNode.removeChild(section))
        })
    ],
    [
        2500,
        3500,
        new SizeAnimation({
            from: design.fontSizes.hiringBanner,
            to: design.fontSizes.average,
            onChange: fontSize => DomHelper.attachStyle(elements.hiringBanner, { fontSize })
        })
    ],
    [
        2000,
        3000,
        new TextAnimation({
            from: elements.homeTitle.innerText,
            to: '',
            onChange: text => elements.homeTitle.innerHTML = text
        })
    ],
    [
        3000,
        4000,
        new TextAnimation({
            from: '',
            to: 'Sparkcentral is hiring!',
            onChange: text => elements.homeTitle.innerHTML = text
        })
    ],
    [
        2500,
        3500,
        new TextAnimation({
            from: elements.homeParagraph.innerText,
            to: '',
            onChange: text => elements.homeParagraph.innerHTML = text
        })
    ],
    [
        2500,
        3500,
        new TextAnimation({
            from: '',
            to: 'You can help them a hand by finding the perfect fit...',
            onChange: text => elements.homeParagraph.innerHTML = text
        })
    ]
];