const ANIMATION_SEQUENCE = (design, elements) => [
    [
        500,
        2000,
        new ColorAnimation({
            from: design.colors.blue,
            to: design.colors.darkBlue,
            onChange: backgroundColor => DomHelper.attachStyle(elements.homeJumbotron, { backgroundColor })
        })
    ],
    [
        1000,
        2000,
        new SizeAnimation({
            from: design.sizes.homeHeight,
            to: design.sizes.height,
            onChange: height => DomHelper.attachStyle(elements.homeJumbotron, { height }),
            onComplete: () => Array.prototype.forEach.call(elements.sectionsAndHrAndFooter, section => section.parentNode.removeChild(section))
        })
    ],
    [
        1500,
        2500,
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
            onChange: text => elements.homeTitle.innerHTML = text,
            onComplete: () => elements.homeSecondaryButton.parentNode.removeChild(elements.homeSecondaryButton)
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
        3400,
        4400,
        new Animation({
            from: 1,
            to: 0.2,
            onChange: opacity => DomHelper.attachStyle(elements.headerMenu, { opacity })
        })
    ],
    [
        3500,
        4500,
        new TextAnimation({
            from: '',
            to: 'You can help them a hand by finding the perfect fit...',
            onChange: text => elements.homeParagraph.innerHTML = text
        })
    ],
    [
        3700,
        4200,
        new TextAnimation({
            from: elements.homePrimaryButton.innerText,
            to: '',
            onChange: text => elements.homePrimaryButton.innerHTML = text
        })
    ],
    [
        4200,
        4700,
        new TextAnimation({
            from: '',
            to: 'Start hunting',
            onChange: text => elements.homePrimaryButton.innerHTML = text
        })
    ]
];