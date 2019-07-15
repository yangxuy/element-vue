<script lang=ts>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { CreateElement } from 'vue';

@Component
export default class Col extends Vue {
  @Prop({ type: Number, default: 24 }) span!: number;
  @Prop({ type: String, default: 'div' }) tag!: string;
  @Prop() offset!: number;

  get gutter() {
    let parent = this.$parent;
    while (parent && parent.$options.name !== 'elRow') {
      parent = parent.$parent;
    }
    // @ts-ignore
    return parent ? parent.gutter : 0;
  }

  render(h: CreateElement) {
    let style: any = {};
    if (this.gutter) {
      style.paddingLeft = this.gutter / 2 + 'px';
      style.paddingRight = style.paddingLeft;
      style.flexGrow = this.span;
      style.flexShrink = 1;
    }

    return h(this.tag, {
      style
    }, this.$slots.default);
  }
}
</script>

<style scoped>
    @media only screen and (max-width: 767px) {
        .hidden-xs-only {
            display: none !important
        }
    }

    @media only screen and (min-width: 768px) {
        .hidden-sm-and-up {
            display: none !important
        }
    }

    @media only screen and (min-width: 768px) and (max-width: 991px) {
        .hidden-sm-only {
            display: none !important
        }
    }

    @media only screen and (max-width: 991px) {
        .hidden-sm-and-down {
            display: none !important
        }
    }

    @media only screen and (min-width: 992px) {
        .hidden-md-and-up {
            display: none !important
        }
    }

    @media only screen and (min-width: 992px) and (max-width: 1199px) {
        .hidden-md-only {
            display: none !important
        }
    }

    @media only screen and (max-width: 1199px) {
        .hidden-md-and-down {
            display: none !important
        }
    }

    @media only screen and (min-width: 1200px) {
        .hidden-lg-and-up {
            display: none !important
        }
    }

    @media only screen and (min-width: 1200px) and (max-width: 1919px) {
        .hidden-lg-only {
            display: none !important
        }
    }

    @media only screen and (max-width: 1919px) {
        .hidden-lg-and-down {
            display: none !important
        }
    }

    @media only screen and (min-width: 1920px) {
        .hidden-xl-only {
            display: none !important
        }
    }
</style>