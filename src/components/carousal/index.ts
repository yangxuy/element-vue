import Carousel from './Carousel.vue';
import CarouselItem from './CarouselItem.vue';

export default {
  install: (Vue: any) => {
    Vue.component('elCarousel', Carousel);
    Vue.component('elCarouselItem', CarouselItem);
  }
};