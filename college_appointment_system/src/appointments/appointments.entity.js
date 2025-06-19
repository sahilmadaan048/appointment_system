"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appointment = void 0;
var user_entity_1 = require("../../../../../../../../../src/users/user.entity");
var typeorm_1 = require("typeorm");
var Appointment = function () {
    var _classDecorators = [(0, typeorm_1.Entity)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _timeSlot_decorators;
    var _timeSlot_initializers = [];
    var _timeSlot_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _student_decorators;
    var _student_initializers = [];
    var _student_extraInitializers = [];
    var _professor_decorators;
    var _professor_initializers = [];
    var _professor_extraInitializers = [];
    var Appointment = _classThis = /** @class */ (function () {
        function Appointment_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.timeSlot = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _timeSlot_initializers, void 0));
            this.status = (__runInitializers(this, _timeSlot_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.student = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _student_initializers, void 0));
            this.professor = (__runInitializers(this, _student_extraInitializers), __runInitializers(this, _professor_initializers, void 0));
            __runInitializers(this, _professor_extraInitializers);
        }
        return Appointment_1;
    }());
    __setFunctionName(_classThis, "Appointment");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _timeSlot_decorators = [(0, typeorm_1.Column)('timestamptz')];
        _status_decorators = [(0, typeorm_1.Column)()];
        _student_decorators = [(0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }, function (user) { return user.studentAppointments; })];
        _professor_decorators = [(0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }, function (user) { return user.professorAppointments; })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _timeSlot_decorators, { kind: "field", name: "timeSlot", static: false, private: false, access: { has: function (obj) { return "timeSlot" in obj; }, get: function (obj) { return obj.timeSlot; }, set: function (obj, value) { obj.timeSlot = value; } }, metadata: _metadata }, _timeSlot_initializers, _timeSlot_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _student_decorators, { kind: "field", name: "student", static: false, private: false, access: { has: function (obj) { return "student" in obj; }, get: function (obj) { return obj.student; }, set: function (obj, value) { obj.student = value; } }, metadata: _metadata }, _student_initializers, _student_extraInitializers);
        __esDecorate(null, null, _professor_decorators, { kind: "field", name: "professor", static: false, private: false, access: { has: function (obj) { return "professor" in obj; }, get: function (obj) { return obj.professor; }, set: function (obj, value) { obj.professor = value; } }, metadata: _metadata }, _professor_initializers, _professor_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Appointment = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Appointment = _classThis;
}();
exports.Appointment = Appointment;
