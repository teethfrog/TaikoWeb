  import { Application, Assets, Container, Sprite } from 'pixi.js';
    const app = new Application();

    let destroyed = false;
    export async function render(element: HTMLElement) {
        await app.init({ background: '#24292af5', resizeTo: element });

      if (destroyed) {
        app.destroy(true);
        return;
      }

      element.appendChild(app.canvas);

      const container = new Container();
      app.stage.addChild(container);

      const donTexture = await Assets.load('../assets/Don.svg');
      const kaTexture = await Assets.load('../assets/Ka.svg');

      if (destroyed) {
        app.destroy(true);
        return;
      }

      for (let i = 0; i < 25; i++) {
        const don = new Sprite(donTexture);
        const ka = new Sprite(kaTexture);
        don.x = (i % 5) * 40;
        don.y = Math.floor(i / 5) * 40;
        ka.x = (i % 5) * 40;
        ka.y = Math.floor(i / 5) * 40;
        container.addChild(don);
        container.addChild(ka);
      }

      container.x = app.screen.width / 2;
      container.y = app.screen.height / 2;

      container.pivot.x = container.width / 2;
      container.pivot.y = container.height / 2;

      app.ticker.add((time) => {
        container.rotation -= 0.01 * time.deltaTime;
      });

    return () => {
      destroyed = true;
      app.destroy(true);
    };
}