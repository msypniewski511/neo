import {default as BaseGallery} from '../../../../src/component/Gallery.mjs';
import PreviewComponent         from './PreviewComponent.mjs';

/**
 * @class RealWorld2.view.article.Gallery
 * @extends Neo.component.Gallery
 */
class Gallery extends BaseGallery {
    static getConfig() {return {
        /**
         * @member {String} className='RealWorld2.view.article.Gallery'
         * @private
         */
        className: 'RealWorld2.view.article.Gallery',
        /**
         * @member {String[]} cls=['rw2-article-gallery', 'neo-gallery', 'page', 'view']
         */
        cls: ['rw2-article-gallery', 'neo-gallery', 'page', 'view'],
        /**
         * The image height of the gallery
         * @member {Number} imageHeight=240
         */
        imageHeight: 240,
        /**
         * The image width of the gallery
         * @member {Number} imageWidth=320
         */
        imageWidth: 320
    }}

    /**
     * Override this method to get different item-markups
     * @param {Object} vdomItem
     * @param {Object} record
     * @param {Number} index
     * @returns {Object} vdomItem
     */
    createItem(vdomItem, record, index) {
        let me = this;

        vdomItem = Neo.create({
            module  : PreviewComponent,
            parentId: me.id,
            ...record,
            author   : record.author.username, // todo: PreviewComponent should use an author object
            userImage: record.author.image
        });

        return {
            cls     : ['neo-gallery-item', 'image-wrap', 'view', 'neo-transition-1000'],
            cn      : [vdomItem.vdom],
            id      : me.getItemVnodeId(record[me.keyProperty]),
            tabIndex: '-1',
            style: {
                height: me.imageHeight + 'px',
                width : me.imageWidth  + 'px'
            }
        };
    }

    /**
     *
     * @param {String} vnodeId
     * @returns {String}
     */
    getItemId(vnodeId) {
        return vnodeId.split('__')[1];
    }
}

Neo.applyClassConfig(Gallery);

export {Gallery as default};