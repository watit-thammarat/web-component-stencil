import { Component, Prop, State, Method } from '@stencil/core';

@Component({
  tag: 'uc-side-drawer',
  styleUrl: './side-drawer.css',
  shadow: true
})
export class SideDrawer {
  @Prop({ reflectToAttr: true }) title: string = 'my title';
  @Prop({ reflectToAttr: true, mutable: true }) opened: boolean = false;

  @State() showContactInfo: boolean = false;

  private onCloseDrawer = () => {
    this.opened = false;
  };

  private onContenctChange = (content: string) => {
    this.showContactInfo = content === 'contact';
  };

  @Method()
  public open() {
    this.opened = true;
  }

  render() {
    let mainContent = <slot />;
    if (this.showContactInfo) {
      mainContent = (
        <div id="contact-information">
          <h2>Contact Information</h2>
          <p>You can reach us via phone or email.</p>
          <ul>
            <li>Phone: 4554477744</li>
            <li>
              E-Mail: <a href="mailto:x@x.com">x@x.com</a>
            </li>
          </ul>
        </div>
      );
    }
    return (
      <div>
        <div class="backdrop" onClick={this.onCloseDrawer} />
        <aside>
          <header>
            <h1>{this.title}</h1>
            <button onClick={this.onCloseDrawer}>X</button>
          </header>
          <section id="tabs">
            <button
              onClick={() => this.onContenctChange('nav')}
              class={{ active: !this.showContactInfo }}
            >
              Navigation
            </button>
            <button
              onClick={() => this.onContenctChange('contact')}
              class={{ active: this.showContactInfo }}
            >
              Contact
            </button>
          </section>
          <main>{mainContent}</main>
        </aside>
      </div>
    );
  }
}
