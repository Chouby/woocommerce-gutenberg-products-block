/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { createBlock, registerBlockType } from '@wordpress/blocks';
import { Icon, discussion } from '@woocommerce/icons';

/**
 * Internal dependencies
 */
import '../editor.scss';
import edit from './edit';
import sharedAttributes from '../attributes';
import save from '../save.js';
import { example } from '../example';

/**
 * Register and run the "All Reviews" block.
 * This block lists all product reviews.
 */
registerBlockType( 'woocommerce/all-reviews', {
	apiVersion: 2,
	title: __( 'All Reviews', 'woo-gutenberg-products-block' ),
	icon: {
		src: <Icon srcElement={ discussion } />,
		foreground: '#96588a',
	},
	category: 'woocommerce',
	keywords: [ __( 'WooCommerce', 'woo-gutenberg-products-block' ) ],
	description: __(
		'Show a list of all product reviews.',
		'woo-gutenberg-products-block'
	),
	supports: {
		html: false,
		color: {
			background: false,
		},
		typography: {
			fontSize: true,
		},
	},
	example: {
		...example,
		attributes: {
			...example.attributes,
			showProductName: true,
		},
	},
	attributes: {
		...sharedAttributes,
		/**
		 * Show the product name.
		 */
		showProductName: {
			type: 'boolean',
			default: true,
		},
	},

	transforms: {
		from: [
			{
				type: 'block',
				blocks: [ 'core/legacy-widget' ],
				// We can't transform if raw instance isn't shown in the REST API.
				isMatch: ( { idBase, instance } ) =>
					idBase === 'woocommerce_recent_reviews' && !! instance?.raw,
				transform: ( { instance } ) =>
					createBlock( 'woocommerce/all-reviews', {
						reviewsOnPageLoad: instance.raw.number,
						imageType: 'product',
						showLoadMore: false,
						showOrderby: false,
						showReviewDate: false,
						showReviewContent: false,
					} ),
			},
		],
	},

	edit,
	save,
} );
