import { FilesCollection } from 'meteor/ostrio:files';
import { Meteor } from 'meteor/meteor';


export const Images = new FilesCollection({
  collectionName: 'Images',
  allowClientCode: false,
  storagePath: '/data/',
})

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
