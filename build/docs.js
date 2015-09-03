
function buildDocs() {

	console.log('Building Leaflet documentation with Leafdoc');

	var LeafDoc = require('leafdoc');
	var doc = new LeafDoc({
		templateDir: '../build/leafdoc-templates',
		showInheritancesWhenEmpty: true
	});

	// Temporary, just so 'Map' appears at the top:
	doc.addStr('// 🍂namespace Map\nLorem ipsum dolor sit amet.');

	/// TODO: Map!!
	doc.addFile('../Leaflet/src/map/Map.js');

	/// TODO: Map anims, exts, handlers!!!


	doc.addFile('../Leaflet/src/layer/marker/Marker.js');
	doc.addFile('../Leaflet/src/layer/marker/Marker.Drag.js');
	doc.addFile('../Leaflet/src/layer/marker/Marker.Popup.js');
	doc.addFile('../Leaflet/src/layer/Popup.js');

	doc.addFile('../Leaflet/src/layer/tile/TileLayer.js');
	doc.addFile('../Leaflet/src/layer/tile/TileLayer.WMS.js');
	doc.addFile('../Leaflet/src/layer/ImageOverlay.js');

	doc.addFile('../Leaflet/src/layer/vector/Path.js');
	doc.addFile('../Leaflet/src/layer/vector/Polyline.js');
	doc.addFile('../Leaflet/src/layer/vector/Polygon.js');
	doc.addFile('../Leaflet/src/layer/vector/Rectangle.js');
	doc.addFile('../Leaflet/src/layer/vector/Circle.js');
	doc.addFile('../Leaflet/src/layer/vector/CircleMarker.js');

	doc.addFile('../Leaflet/src/layer/LayerGroup.js');
	doc.addFile('../Leaflet/src/layer/FeatureGroup.js');
	doc.addFile('../Leaflet/src/layer/GeoJSON.js');
	doc.addFile('../Leaflet/src/layer/tile/GridLayer.js');

	doc.addFile('../Leaflet/src/geo/LatLng.js');
	doc.addFile('../Leaflet/src/geo/LatLngBounds.js');
	doc.addFile('../Leaflet/src/geometry/Point.js');
	doc.addFile('../Leaflet/src/geometry/Bounds.js');
	doc.addFile('../Leaflet/src/layer/marker/Icon.js');
	doc.addFile('../Leaflet/src/layer/marker/DivIcon.js');

	doc.addFile('../Leaflet/src/control/Control.Zoom.js');
	doc.addFile('../Leaflet/src/control/Control.Attribution.js');
	doc.addFile('../Leaflet/src/control/Control.Layers.js');
	doc.addFile('../Leaflet/src/control/Control.Scale.js');

	doc.addFile('../Leaflet/src/core/Browser.js');
	doc.addFile('../Leaflet/src/core/Util.js');
	doc.addFile('../Leaflet/src/geometry/Transformation.js');
	doc.addFile('../Leaflet/src/geometry/LineUtil.js');
	doc.addFile('../Leaflet/src/geometry/PolyUtil.js');
	doc.addFile('../Leaflet/src/dom/DomEvent.js');
	doc.addFile('../Leaflet/src/dom/DomEvent.DoubleTap.js');
	doc.addFile('../Leaflet/src/dom/DomEvent.Pointer.js');
	doc.addFile('../Leaflet/src/dom/DomUtil.js');
	doc.addFile('../Leaflet/src/dom/PosAnimation.js');
	doc.addFile('../Leaflet/src/dom/Draggable.js');

	doc.addFile('../Leaflet/src/core/Class.js');
	doc.addFile('../Leaflet/src/core/Events.js');
	doc.addFile('../Leaflet/src/layer/Layer.js');	/// TODO: Ensure L.Layer appears here, not in popups where some stuff is added.
	doc.addFile('../Leaflet/src/layer/Layer.Popup.js');
	doc.addFile('../Leaflet/src/control/Control.js');
	doc.addFile('../Leaflet/src/core/Handler.js');
	// doc.addFile('../Leaflet/src/.js');	/// FIXME: Projection base, projections
	// doc.addFile('../Leaflet/src/geo/crs/CRS.js');	/// FIXME: Other CRSs

	/// FIXME: Event objects

	/// FIXME: Global switches

	/// FIXME: noConflict

	/// FIXME: version



	// console.log('internal namespaces are', doc._namespaces);


	// console.log('status is', doc);

	// console.log('calling outputStr');
	var out = doc.outputStr();


	var fs = require('fs');


	fs.writeFileSync('dist/reference.html', out);

}

module.exports = buildDocs;