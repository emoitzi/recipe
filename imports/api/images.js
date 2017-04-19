import { FilesCollection } from 'meteor/ostrio:files';
import { Meteor } from 'meteor/meteor';


export const Images = new FilesCollection({
  collectionName: 'Images',
  allowClientCode: false,
  storagePath: '/data',
  downloadRoute: '/images',
  public: true,
})

export const resolutions = {
  title: {
    width: 400,
    height: 300,
  },
  recipe: {
    width: 800,
    height: 600,
  }
}

export function defaultTitleImageUrl() {
  const width = resolutions.title.width.toString();
  const height = resolutions.title.height.toString();
  return "https://unsplash.it/g/" + width + "/" + height + "?image=250&blur";
}


if (Meteor.isServer){
  Meteor.publish("images.one", function(id){
    const image = Images.find({_id: id});
    if (image) {
      return image.cursor;
    }
    else {
      return this.ready();
    }
  });
  Meteor.publish("images", function(){
    const images = Images.find({});
    if (images) {
      return images.cursor;
    }
    else {
      return this.ready();
    }
  });
};
