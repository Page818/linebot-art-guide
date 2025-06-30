export default () => ({
  type: 'bubble',
  hero: {
    type: 'image',
    url: 'https://developers-resource.landpress.line.me/fx/img/01_1_cafe.png',
    size: 'full',
    aspectRatio: '20:13',
    aspectMode: 'cover',
    action: {
      type: 'uri',
      uri: 'https://line.me/',
    },
  },
  body: {
    type: 'box',
    layout: 'vertical',
    backgroundColor: '#08538c',

    contents: [
      {
        type: 'text',
        text: 'Brown Cafe',
        weight: 'bold',
        size: 'xl',
        align: 'center',
        color: '#fff9ea',
      },
      {
        type: 'box',
        layout: 'vertical',
        margin: 'lg',
        spacing: 'sm',
        contents: [
          {
            type: 'box',
            layout: 'baseline',
            spacing: 'sm',
            contents: [
              {
                type: 'text',
                text: '作者',
                color: '#fdbd10',
                size: 'sm',
                flex: 3,
              },
              {
                type: 'text',
                text: 'XOX',
                wrap: true,
                color: '#fff9ea',
                size: 'sm',
                flex: 5,
              },
            ],
          },
          {
            type: 'box',
            layout: 'baseline',
            spacing: 'sm',
            contents: [
              {
                type: 'text',
                text: '作品說明',
                color: '#fdbd10',
                size: 'sm',
                flex: 3,
              },
              {
                type: 'text',
                text: '123',
                wrap: true,
                color: '#fff9ea',
                size: 'xs',
                flex: 5,
                maxLines: 6,
              },
            ],
          },
          {
            type: 'box',
            layout: 'baseline',
            spacing: 'sm',
            contents: [
              {
                type: 'text',
                text: '作品材質',
                color: '#fdbd10',
                size: 'sm',
                flex: 3,
              },
              {
                type: 'text',
                text: '123',
                wrap: true,
                color: '#fff9ea',
                size: 'sm',
                flex: 5,
                maxLines: 2,
              },
            ],
          },
          {
            type: 'box',
            layout: 'vertical',
            margin: 'lg',
            spacing: 'sm',
            contents: [
              {
                type: 'box',
                layout: 'baseline',
                spacing: 'sm',
                contents: [
                  {
                    type: 'text',
                    text: '地址',
                    color: '#fdbd10',
                    size: 'sm',
                    flex: 3,
                  },
                  {
                    type: 'text',
                    text: '123',
                    wrap: true,
                    color: '#fff9ea',
                    size: 'sm',
                    flex: 5,
                    maxLines: 3,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  footer: {
    type: 'box',
    layout: 'vertical',
    spacing: 'sm',
    backgroundColor: '#08538c',

    contents: [
      {
        type: 'button',
        style: 'link',
        height: 'sm',
        color: '#fff000',
        action: {
          type: 'uri',
          label: 'Google 地圖',
          uri: 'https://line.me/',
        },
      },
    ],
    flex: 0,
  },
})
