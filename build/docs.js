
function buildDocs() {

	console.log('Building Leaflet documentation with Leafdoc');

	var LeafDoc = require('leafdoc');
	var doc = new LeafDoc({
		templateDir: '../build/leafdoc-templates',
		showInheritancesWhenEmpty: true
	});


	/// TODO: Review sections in Map.js, maybe move methods around
	doc.addFile('src/map/Map.js');

	/// TODO: Map panes!!
	/// TODO: Options for map methods!! (fitbounds opts, zoom-pan opts, etc)
	/// Maybe implement the "minor classes" thing?


	doc.addFile('src/map/anim/Map.PanAnimation.js');
	doc.addFile('src/map/anim/Map.ZoomAnimation.js');
	doc.addFile('src/map/anim/Map.FlyTo.js');
	doc.addFile('src/map/ext/Map.Geolocation.js');
	doc.addFile('src/map/handler/Map.BoxZoom.js');
	doc.addFile('src/map/handler/Map.DoubleClickZoom.js');
	doc.addFile('src/map/handler/Map.Drag.js');
	doc.addFile('src/map/handler/Map.Keyboard.js');
	doc.addFile('src/map/handler/Map.ScrollWheelZoom.js');
	doc.addFile('src/map/handler/Map.Tap.js');
	doc.addFile('src/map/handler/Map.TouchZoom.js');

	doc.addFile('src/layer/marker/Marker.js');
	doc.addFile('src/layer/marker/Marker.Drag.js');
	doc.addFile('src/layer/marker/Marker.Popup.js');
	doc.addFile('src/layer/Popup.js');

	doc.addFile('src/layer/tile/TileLayer.js');
	doc.addFile('src/layer/tile/TileLayer.WMS.js');
	doc.addFile('src/layer/ImageOverlay.js');

	doc.addFile('src/layer/vector/Path.js');
	doc.addFile('src/layer/vector/Polyline.js');
	doc.addFile('src/layer/vector/Polygon.js');
	doc.addFile('src/layer/vector/Rectangle.js');
	doc.addFile('src/layer/vector/Circle.js');
	doc.addFile('src/layer/vector/CircleMarker.js');

	doc.addFile('src/layer/LayerGroup.js');
	doc.addFile('src/layer/FeatureGroup.js');
	doc.addFile('src/layer/GeoJSON.js');
	doc.addFile('src/layer/tile/GridLayer.js');

	doc.addFile('src/geo/LatLng.js');
	doc.addFile('src/geo/LatLngBounds.js');
	doc.addFile('src/geometry/Point.js');
	doc.addFile('src/geometry/Bounds.js');
	doc.addFile('src/layer/marker/Icon.js');
	doc.addFile('src/layer/marker/DivIcon.js');

	doc.addFile('src/control/Control.Zoom.js');
	doc.addFile('src/control/Control.Attribution.js');
	doc.addFile('src/control/Control.Layers.js');
	doc.addFile('src/control/Control.Scale.js');

	doc.addFile('src/core/Browser.js');
	doc.addFile('src/core/Util.js');
	doc.addFile('src/geometry/Transformation.js');
	doc.addFile('src/geometry/LineUtil.js');
	doc.addFile('src/geometry/PolyUtil.js');
	doc.addFile('src/dom/DomEvent.js');
	doc.addFile('src/dom/DomEvent.DoubleTap.js');
	doc.addFile('src/dom/DomEvent.Pointer.js');
	doc.addFile('src/dom/DomUtil.js');
	doc.addFile('src/dom/PosAnimation.js');
	doc.addFile('src/dom/Draggable.js');

	doc.addFile('src/core/Class.js');
	doc.addFile('src/core/Events.js');
	doc.addFile('src/layer/Layer.js');	/// TODO: Ensure L.Layer appears here, not in popups where some stuff is added.
	doc.addFile('src/layer/Layer.Popup.js');
	doc.addFile('src/control/Control.js');
	doc.addFile('src/core/Handler.js');
	// doc.addFile('src/geo/projection/*.js');	/// FIXME: Projection base, projections
	doc.addFile('src/geo/crs/CRS.js');	/// FIXME: Other CRSs

	/// FIXME: Event objects
	/// Maybe implement the "minor classes" thing?

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