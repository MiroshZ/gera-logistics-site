import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('ru', 'zh-CN');
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor', 'manager');
  CREATE TYPE "public"."enum_pages_slug" AS ENUM('home', 'terminals', 'warehouse', 'container', 'warehouse-services', 'transport', 'fleet', 'about', 'contacts');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_version_slug" AS ENUM('home', 'terminals', 'warehouse', 'container', 'warehouse-services', 'transport', 'fleet', 'about', 'contacts');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_published_locale" AS ENUM('ru', 'zh-CN');
  CREATE TYPE "public"."enum_terminals_type" AS ENUM('warehouse', 'container');
  CREATE TYPE "public"."enum_terminals_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__terminals_v_version_type" AS ENUM('warehouse', 'container');
  CREATE TYPE "public"."enum__terminals_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__terminals_v_published_locale" AS ENUM('ru', 'zh-CN');
  CREATE TYPE "public"."enum_warehouse_details_zones_area_unit" AS ENUM('м²', 'га');
  CREATE TYPE "public"."enum_warehouse_details_zones_volume_unit" AS ENUM('м³', 'л');
  CREATE TYPE "public"."enum_warehouse_details_area_unit" AS ENUM('м²', 'га');
  CREATE TYPE "public"."enum_warehouse_details_volume_unit" AS ENUM('м³', 'л');
  CREATE TYPE "public"."enum_warehouse_details_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__warehouse_details_v_version_zones_area_unit" AS ENUM('м²', 'га');
  CREATE TYPE "public"."enum__warehouse_details_v_version_zones_volume_unit" AS ENUM('м³', 'л');
  CREATE TYPE "public"."enum__warehouse_details_v_version_area_unit" AS ENUM('м²', 'га');
  CREATE TYPE "public"."enum__warehouse_details_v_version_volume_unit" AS ENUM('м³', 'л');
  CREATE TYPE "public"."enum__warehouse_details_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__warehouse_details_v_published_locale" AS ENUM('ru', 'zh-CN');
  CREATE TYPE "public"."enum_container_specs_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__container_specs_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__container_specs_v_published_locale" AS ENUM('ru', 'zh-CN');
  CREATE TYPE "public"."enum_services_category" AS ENUM('warehouse', 'container', 'transport');
  CREATE TYPE "public"."enum_services_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__services_v_version_category" AS ENUM('warehouse', 'container', 'transport');
  CREATE TYPE "public"."enum__services_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__services_v_published_locale" AS ENUM('ru', 'zh-CN');
  CREATE TYPE "public"."enum_fleet_items_payload_unit" AS ENUM('кг', 'т');
  CREATE TYPE "public"."enum_fleet_items_volume_unit" AS ENUM('м³', 'л');
  CREATE TYPE "public"."enum_fleet_items_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__fleet_items_v_version_payload_unit" AS ENUM('кг', 'т');
  CREATE TYPE "public"."enum__fleet_items_v_version_volume_unit" AS ENUM('м³', 'л');
  CREATE TYPE "public"."enum__fleet_items_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__fleet_items_v_published_locale" AS ENUM('ru', 'zh-CN');
  CREATE TYPE "public"."enum_routes_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__routes_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__routes_v_published_locale" AS ENUM('ru', 'zh-CN');
  CREATE TYPE "public"."enum_tariffs_category" AS ENUM('warehouse', 'container', 'transport');
  CREATE TYPE "public"."enum_tariffs_currency" AS ENUM('RUB', 'CNY', 'USD');
  CREATE TYPE "public"."enum_tariffs_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__tariffs_v_version_category" AS ENUM('warehouse', 'container', 'transport');
  CREATE TYPE "public"."enum__tariffs_v_version_currency" AS ENUM('RUB', 'CNY', 'USD');
  CREATE TYPE "public"."enum__tariffs_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__tariffs_v_published_locale" AS ENUM('ru', 'zh-CN');
  CREATE TYPE "public"."enum_leads_services" AS ENUM('warehouse', 'container', 'transport');
  CREATE TYPE "public"."enum_leads_status" AS ENUM('new', 'in-progress', 'waiting', 'closed');
  CREATE TYPE "public"."enum_leads_notification_status" AS ENUM('pending', 'sending', 'sent', 'failed', 'not-configured');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" "enum_users_role" DEFAULT 'manager' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" "enum_pages_slug",
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_locales" (
  	"title" varchar,
  	"eyebrow" varchar,
  	"hero_title" varchar,
  	"intro" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" "enum__pages_v_version_slug",
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__pages_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_pages_v_locales" (
  	"version_title" varchar,
  	"version_eyebrow" varchar,
  	"version_hero_title" varchar,
  	"version_intro" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "terminals_photos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"checked_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "terminals_photos_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "terminals" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum_terminals_type",
  	"slug" varchar,
  	"address_map_url" varchar,
  	"contact_phone" varchar,
  	"contact_email" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_terminals_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "terminals_locales" (
  	"name" varchar,
  	"description" varchar,
  	"address_street" varchar,
  	"address_city" varchar,
  	"address_directions" varchar,
  	"schedule" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_terminals_v_version_photos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"checked_at" timestamp(3) with time zone,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_terminals_v_version_photos_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_terminals_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_type" "enum__terminals_v_version_type",
  	"version_slug" varchar,
  	"version_address_map_url" varchar,
  	"version_contact_phone" varchar,
  	"version_contact_email" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__terminals_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__terminals_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_terminals_v_locales" (
  	"version_name" varchar,
  	"version_description" varchar,
  	"version_address_street" varchar,
  	"version_address_city" varchar,
  	"version_address_directions" varchar,
  	"version_schedule" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "warehouse_details_zones" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"area" numeric,
  	"area_unit" "enum_warehouse_details_zones_area_unit",
  	"volume" numeric,
  	"volume_unit" "enum_warehouse_details_zones_volume_unit",
  	"available" boolean DEFAULT true
  );
  
  CREATE TABLE "warehouse_details_zones_locales" (
  	"name" varchar,
  	"temperature" varchar,
  	"notes" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "warehouse_details" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"terminal_id" integer,
  	"total_area" numeric,
  	"area_unit" "enum_warehouse_details_area_unit",
  	"total_volume" numeric,
  	"volume_unit" "enum_warehouse_details_volume_unit",
  	"verified_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_warehouse_details_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "warehouse_details_locales" (
  	"infrastructure" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_warehouse_details_v_version_zones" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"area" numeric,
  	"area_unit" "enum__warehouse_details_v_version_zones_area_unit",
  	"volume" numeric,
  	"volume_unit" "enum__warehouse_details_v_version_zones_volume_unit",
  	"available" boolean DEFAULT true,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_warehouse_details_v_version_zones_locales" (
  	"name" varchar,
  	"temperature" varchar,
  	"notes" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_warehouse_details_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_terminal_id" integer,
  	"version_total_area" numeric,
  	"version_area_unit" "enum__warehouse_details_v_version_area_unit",
  	"version_total_volume" numeric,
  	"version_volume_unit" "enum__warehouse_details_v_version_volume_unit",
  	"version_verified_at" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__warehouse_details_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__warehouse_details_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_warehouse_details_v_locales" (
  	"version_infrastructure" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "container_specs_operations" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "container_specs_operations_locales" (
  	"name" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "container_specs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"terminal_id" integer,
  	"verified_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_container_specs_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "container_specs_locales" (
  	"container_types" varchar,
  	"equipment" varchar,
  	"limitations" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_container_specs_v_version_operations" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_container_specs_v_version_operations_locales" (
  	"name" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_container_specs_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_terminal_id" integer,
  	"version_verified_at" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__container_specs_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__container_specs_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_container_specs_v_locales" (
  	"version_container_types" varchar,
  	"version_equipment" varchar,
  	"version_limitations" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"category" "enum_services_category",
  	"terminal_id" integer,
  	"image_id" integer,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_services_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "services_locales" (
  	"title" varchar,
  	"description" varchar,
  	"requirements" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_category" "enum__services_v_version_category",
  	"version_terminal_id" integer,
  	"version_image_id" integer,
  	"version_sort_order" numeric DEFAULT 0,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__services_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__services_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_services_v_locales" (
  	"version_title" varchar,
  	"version_description" varchar,
  	"version_requirements" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "fleet_items" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"quantity" numeric,
  	"payload" numeric,
  	"payload_unit" "enum_fleet_items_payload_unit",
  	"volume" numeric,
  	"volume_unit" "enum_fleet_items_volume_unit",
  	"photo_id" integer,
  	"verified_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_fleet_items_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "fleet_items_locales" (
  	"title" varchar,
  	"category" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_fleet_items_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_quantity" numeric,
  	"version_payload" numeric,
  	"version_payload_unit" "enum__fleet_items_v_version_payload_unit",
  	"version_volume" numeric,
  	"version_volume_unit" "enum__fleet_items_v_version_volume_unit",
  	"version_photo_id" integer,
  	"version_verified_at" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__fleet_items_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__fleet_items_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_fleet_items_v_locales" (
  	"version_title" varchar,
  	"version_category" varchar,
  	"version_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "routes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"verified_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_routes_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "routes_locales" (
  	"from" varchar,
  	"to" varchar,
  	"service" varchar,
  	"limitations" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_routes_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_verified_at" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__routes_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__routes_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_routes_v_locales" (
  	"version_from" varchar,
  	"version_to" varchar,
  	"version_service" varchar,
  	"version_limitations" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "tariffs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"category" "enum_tariffs_category",
  	"service_id" integer,
  	"amount" numeric,
  	"currency" "enum_tariffs_currency" DEFAULT 'RUB',
  	"valid_from" timestamp(3) with time zone,
  	"valid_until" timestamp(3) with time zone,
  	"publicly_visible" boolean DEFAULT false,
  	"verified_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_tariffs_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "tariffs_locales" (
  	"title" varchar,
  	"unit" varchar,
  	"terms" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_tariffs_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_category" "enum__tariffs_v_version_category",
  	"version_service_id" integer,
  	"version_amount" numeric,
  	"version_currency" "enum__tariffs_v_version_currency" DEFAULT 'RUB',
  	"version_valid_from" timestamp(3) with time zone,
  	"version_valid_until" timestamp(3) with time zone,
  	"version_publicly_visible" boolean DEFAULT false,
  	"version_verified_at" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__tariffs_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__tariffs_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_tariffs_v_locales" (
  	"version_title" varchar,
  	"version_unit" varchar,
  	"version_terms" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "leads_services" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_leads_services",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "leads" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"submission_id" varchar,
  	"name" varchar NOT NULL,
  	"company" varchar,
  	"phone" varchar,
  	"email" varchar,
  	"cargo_type" varchar,
  	"quantity" varchar,
  	"weight" varchar,
  	"volume" varchar,
  	"storage_period" varchar,
  	"warehouse_operation" varchar,
  	"temperature" varchar,
  	"container_type" varchar,
  	"container_operation" varchar,
  	"container_quantity" varchar,
  	"container_status" varchar,
  	"operation" varchar,
  	"origin" varchar,
  	"destination" varchar,
  	"dimensions" varchar,
  	"cargo_dimensions" varchar,
  	"desired_date" varchar,
  	"description" varchar,
  	"consent_accepted" boolean DEFAULT false NOT NULL,
  	"consent_version" varchar,
  	"source_page" varchar,
  	"locale" varchar DEFAULT 'ru',
  	"status" "enum_leads_status" DEFAULT 'new',
  	"assigned_to_id" integer,
  	"internal_notes" varchar,
  	"notification_status" "enum_leads_notification_status" DEFAULT 'pending',
  	"notification_attempts" numeric DEFAULT 0,
  	"notification_error" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"pages_id" integer,
  	"terminals_id" integer,
  	"warehouse_details_id" integer,
  	"container_specs_id" integer,
  	"services_id" integer,
  	"fleet_items_id" integer,
  	"routes_id" integer,
  	"tariffs_id" integer,
  	"leads_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_social_links_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"company_name" varchar DEFAULT 'ГЕРА',
  	"warehouse_phone" varchar,
  	"transport_phone" varchar,
  	"public_phone" varchar,
  	"public_email" varchar,
  	"additional_email" varchar,
  	"company_details_legal_name" varchar,
  	"company_details_legal_address" varchar,
  	"company_details_postal_address" varchar,
  	"company_details_director_name" varchar,
  	"company_details_inn" varchar,
  	"company_details_kpp" varchar,
  	"company_details_ogrn" varchar,
  	"company_details_okpo" varchar,
  	"company_details_edo_id" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings_locales" (
  	"tagline" varchar,
  	"footer_note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "email_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"recipient_email" varchar NOT NULL,
  	"last_tested_at" timestamp(3) with time zone,
  	"last_test_status" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "terminals_photos" ADD CONSTRAINT "terminals_photos_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "terminals_photos" ADD CONSTRAINT "terminals_photos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."terminals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "terminals_photos_locales" ADD CONSTRAINT "terminals_photos_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."terminals_photos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "terminals_locales" ADD CONSTRAINT "terminals_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."terminals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_terminals_v_version_photos" ADD CONSTRAINT "_terminals_v_version_photos_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_terminals_v_version_photos" ADD CONSTRAINT "_terminals_v_version_photos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_terminals_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_terminals_v_version_photos_locales" ADD CONSTRAINT "_terminals_v_version_photos_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_terminals_v_version_photos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_terminals_v" ADD CONSTRAINT "_terminals_v_parent_id_terminals_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."terminals"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_terminals_v_locales" ADD CONSTRAINT "_terminals_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_terminals_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "warehouse_details_zones" ADD CONSTRAINT "warehouse_details_zones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."warehouse_details"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "warehouse_details_zones_locales" ADD CONSTRAINT "warehouse_details_zones_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."warehouse_details_zones"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "warehouse_details" ADD CONSTRAINT "warehouse_details_terminal_id_terminals_id_fk" FOREIGN KEY ("terminal_id") REFERENCES "public"."terminals"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "warehouse_details_locales" ADD CONSTRAINT "warehouse_details_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."warehouse_details"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_warehouse_details_v_version_zones" ADD CONSTRAINT "_warehouse_details_v_version_zones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_warehouse_details_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_warehouse_details_v_version_zones_locales" ADD CONSTRAINT "_warehouse_details_v_version_zones_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_warehouse_details_v_version_zones"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_warehouse_details_v" ADD CONSTRAINT "_warehouse_details_v_parent_id_warehouse_details_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."warehouse_details"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_warehouse_details_v" ADD CONSTRAINT "_warehouse_details_v_version_terminal_id_terminals_id_fk" FOREIGN KEY ("version_terminal_id") REFERENCES "public"."terminals"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_warehouse_details_v_locales" ADD CONSTRAINT "_warehouse_details_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_warehouse_details_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "container_specs_operations" ADD CONSTRAINT "container_specs_operations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."container_specs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "container_specs_operations_locales" ADD CONSTRAINT "container_specs_operations_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."container_specs_operations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "container_specs" ADD CONSTRAINT "container_specs_terminal_id_terminals_id_fk" FOREIGN KEY ("terminal_id") REFERENCES "public"."terminals"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "container_specs_locales" ADD CONSTRAINT "container_specs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."container_specs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_container_specs_v_version_operations" ADD CONSTRAINT "_container_specs_v_version_operations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_container_specs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_container_specs_v_version_operations_locales" ADD CONSTRAINT "_container_specs_v_version_operations_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_container_specs_v_version_operations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_container_specs_v" ADD CONSTRAINT "_container_specs_v_parent_id_container_specs_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."container_specs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_container_specs_v" ADD CONSTRAINT "_container_specs_v_version_terminal_id_terminals_id_fk" FOREIGN KEY ("version_terminal_id") REFERENCES "public"."terminals"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_container_specs_v_locales" ADD CONSTRAINT "_container_specs_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_container_specs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_terminal_id_terminals_id_fk" FOREIGN KEY ("terminal_id") REFERENCES "public"."terminals"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_locales" ADD CONSTRAINT "services_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_parent_id_services_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_version_terminal_id_terminals_id_fk" FOREIGN KEY ("version_terminal_id") REFERENCES "public"."terminals"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_locales" ADD CONSTRAINT "_services_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "fleet_items" ADD CONSTRAINT "fleet_items_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "fleet_items_locales" ADD CONSTRAINT "fleet_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."fleet_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_fleet_items_v" ADD CONSTRAINT "_fleet_items_v_parent_id_fleet_items_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."fleet_items"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_fleet_items_v" ADD CONSTRAINT "_fleet_items_v_version_photo_id_media_id_fk" FOREIGN KEY ("version_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_fleet_items_v_locales" ADD CONSTRAINT "_fleet_items_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_fleet_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "routes_locales" ADD CONSTRAINT "routes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."routes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_routes_v" ADD CONSTRAINT "_routes_v_parent_id_routes_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."routes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_routes_v_locales" ADD CONSTRAINT "_routes_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_routes_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tariffs" ADD CONSTRAINT "tariffs_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tariffs_locales" ADD CONSTRAINT "tariffs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tariffs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tariffs_v" ADD CONSTRAINT "_tariffs_v_parent_id_tariffs_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."tariffs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_tariffs_v" ADD CONSTRAINT "_tariffs_v_version_service_id_services_id_fk" FOREIGN KEY ("version_service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_tariffs_v_locales" ADD CONSTRAINT "_tariffs_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tariffs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "leads_services" ADD CONSTRAINT "leads_services_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."leads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "leads" ADD CONSTRAINT "leads_assigned_to_id_users_id_fk" FOREIGN KEY ("assigned_to_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_terminals_fk" FOREIGN KEY ("terminals_id") REFERENCES "public"."terminals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_warehouse_details_fk" FOREIGN KEY ("warehouse_details_id") REFERENCES "public"."warehouse_details"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_container_specs_fk" FOREIGN KEY ("container_specs_id") REFERENCES "public"."container_specs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_fleet_items_fk" FOREIGN KEY ("fleet_items_id") REFERENCES "public"."fleet_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_routes_fk" FOREIGN KEY ("routes_id") REFERENCES "public"."routes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tariffs_fk" FOREIGN KEY ("tariffs_id") REFERENCES "public"."tariffs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_leads_fk" FOREIGN KEY ("leads_id") REFERENCES "public"."leads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_social_links" ADD CONSTRAINT "site_settings_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_social_links_locales" ADD CONSTRAINT "site_settings_social_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings_social_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_locales" ADD CONSTRAINT "site_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_locales_parent_id_idx" ON "pages_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_snapshot_idx" ON "_pages_v" USING btree ("snapshot");
  CREATE INDEX "_pages_v_published_locale_idx" ON "_pages_v" USING btree ("published_locale");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_pages_v_locales_locale_parent_id_unique" ON "_pages_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_locales_parent_id_idx" ON "_pages_v_locales" USING btree ("_parent_id");
  CREATE INDEX "terminals_photos_order_idx" ON "terminals_photos" USING btree ("_order");
  CREATE INDEX "terminals_photos_parent_id_idx" ON "terminals_photos" USING btree ("_parent_id");
  CREATE INDEX "terminals_photos_image_idx" ON "terminals_photos" USING btree ("image_id");
  CREATE UNIQUE INDEX "terminals_photos_locales_locale_parent_id_unique" ON "terminals_photos_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "terminals_photos_locales_parent_id_idx" ON "terminals_photos_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "terminals_slug_idx" ON "terminals" USING btree ("slug");
  CREATE INDEX "terminals_updated_at_idx" ON "terminals" USING btree ("updated_at");
  CREATE INDEX "terminals_created_at_idx" ON "terminals" USING btree ("created_at");
  CREATE INDEX "terminals__status_idx" ON "terminals" USING btree ("_status");
  CREATE UNIQUE INDEX "terminals_locales_locale_parent_id_unique" ON "terminals_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "terminals_locales_parent_id_idx" ON "terminals_locales" USING btree ("_parent_id");
  CREATE INDEX "_terminals_v_version_photos_order_idx" ON "_terminals_v_version_photos" USING btree ("_order");
  CREATE INDEX "_terminals_v_version_photos_parent_id_idx" ON "_terminals_v_version_photos" USING btree ("_parent_id");
  CREATE INDEX "_terminals_v_version_photos_image_idx" ON "_terminals_v_version_photos" USING btree ("image_id");
  CREATE UNIQUE INDEX "_terminals_v_version_photos_locales_locale_parent_id_unique" ON "_terminals_v_version_photos_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_terminals_v_version_photos_locales_parent_id_idx" ON "_terminals_v_version_photos_locales" USING btree ("_parent_id");
  CREATE INDEX "_terminals_v_parent_idx" ON "_terminals_v" USING btree ("parent_id");
  CREATE INDEX "_terminals_v_version_version_slug_idx" ON "_terminals_v" USING btree ("version_slug");
  CREATE INDEX "_terminals_v_version_version_updated_at_idx" ON "_terminals_v" USING btree ("version_updated_at");
  CREATE INDEX "_terminals_v_version_version_created_at_idx" ON "_terminals_v" USING btree ("version_created_at");
  CREATE INDEX "_terminals_v_version_version__status_idx" ON "_terminals_v" USING btree ("version__status");
  CREATE INDEX "_terminals_v_created_at_idx" ON "_terminals_v" USING btree ("created_at");
  CREATE INDEX "_terminals_v_updated_at_idx" ON "_terminals_v" USING btree ("updated_at");
  CREATE INDEX "_terminals_v_snapshot_idx" ON "_terminals_v" USING btree ("snapshot");
  CREATE INDEX "_terminals_v_published_locale_idx" ON "_terminals_v" USING btree ("published_locale");
  CREATE INDEX "_terminals_v_latest_idx" ON "_terminals_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_terminals_v_locales_locale_parent_id_unique" ON "_terminals_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_terminals_v_locales_parent_id_idx" ON "_terminals_v_locales" USING btree ("_parent_id");
  CREATE INDEX "warehouse_details_zones_order_idx" ON "warehouse_details_zones" USING btree ("_order");
  CREATE INDEX "warehouse_details_zones_parent_id_idx" ON "warehouse_details_zones" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "warehouse_details_zones_locales_locale_parent_id_unique" ON "warehouse_details_zones_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "warehouse_details_zones_locales_parent_id_idx" ON "warehouse_details_zones_locales" USING btree ("_parent_id");
  CREATE INDEX "warehouse_details_terminal_idx" ON "warehouse_details" USING btree ("terminal_id");
  CREATE INDEX "warehouse_details_updated_at_idx" ON "warehouse_details" USING btree ("updated_at");
  CREATE INDEX "warehouse_details_created_at_idx" ON "warehouse_details" USING btree ("created_at");
  CREATE INDEX "warehouse_details__status_idx" ON "warehouse_details" USING btree ("_status");
  CREATE UNIQUE INDEX "warehouse_details_locales_locale_parent_id_unique" ON "warehouse_details_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "warehouse_details_locales_parent_id_idx" ON "warehouse_details_locales" USING btree ("_parent_id");
  CREATE INDEX "_warehouse_details_v_version_zones_order_idx" ON "_warehouse_details_v_version_zones" USING btree ("_order");
  CREATE INDEX "_warehouse_details_v_version_zones_parent_id_idx" ON "_warehouse_details_v_version_zones" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_warehouse_details_v_version_zones_locales_locale_parent_id_" ON "_warehouse_details_v_version_zones_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_warehouse_details_v_version_zones_locales_parent_id_idx" ON "_warehouse_details_v_version_zones_locales" USING btree ("_parent_id");
  CREATE INDEX "_warehouse_details_v_parent_idx" ON "_warehouse_details_v" USING btree ("parent_id");
  CREATE INDEX "_warehouse_details_v_version_version_terminal_idx" ON "_warehouse_details_v" USING btree ("version_terminal_id");
  CREATE INDEX "_warehouse_details_v_version_version_updated_at_idx" ON "_warehouse_details_v" USING btree ("version_updated_at");
  CREATE INDEX "_warehouse_details_v_version_version_created_at_idx" ON "_warehouse_details_v" USING btree ("version_created_at");
  CREATE INDEX "_warehouse_details_v_version_version__status_idx" ON "_warehouse_details_v" USING btree ("version__status");
  CREATE INDEX "_warehouse_details_v_created_at_idx" ON "_warehouse_details_v" USING btree ("created_at");
  CREATE INDEX "_warehouse_details_v_updated_at_idx" ON "_warehouse_details_v" USING btree ("updated_at");
  CREATE INDEX "_warehouse_details_v_snapshot_idx" ON "_warehouse_details_v" USING btree ("snapshot");
  CREATE INDEX "_warehouse_details_v_published_locale_idx" ON "_warehouse_details_v" USING btree ("published_locale");
  CREATE INDEX "_warehouse_details_v_latest_idx" ON "_warehouse_details_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_warehouse_details_v_locales_locale_parent_id_unique" ON "_warehouse_details_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_warehouse_details_v_locales_parent_id_idx" ON "_warehouse_details_v_locales" USING btree ("_parent_id");
  CREATE INDEX "container_specs_operations_order_idx" ON "container_specs_operations" USING btree ("_order");
  CREATE INDEX "container_specs_operations_parent_id_idx" ON "container_specs_operations" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "container_specs_operations_locales_locale_parent_id_unique" ON "container_specs_operations_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "container_specs_operations_locales_parent_id_idx" ON "container_specs_operations_locales" USING btree ("_parent_id");
  CREATE INDEX "container_specs_terminal_idx" ON "container_specs" USING btree ("terminal_id");
  CREATE INDEX "container_specs_updated_at_idx" ON "container_specs" USING btree ("updated_at");
  CREATE INDEX "container_specs_created_at_idx" ON "container_specs" USING btree ("created_at");
  CREATE INDEX "container_specs__status_idx" ON "container_specs" USING btree ("_status");
  CREATE UNIQUE INDEX "container_specs_locales_locale_parent_id_unique" ON "container_specs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "container_specs_locales_parent_id_idx" ON "container_specs_locales" USING btree ("_parent_id");
  CREATE INDEX "_container_specs_v_version_operations_order_idx" ON "_container_specs_v_version_operations" USING btree ("_order");
  CREATE INDEX "_container_specs_v_version_operations_parent_id_idx" ON "_container_specs_v_version_operations" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_container_specs_v_version_operations_locales_locale_parent_" ON "_container_specs_v_version_operations_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_container_specs_v_version_operations_locales_parent_id_idx" ON "_container_specs_v_version_operations_locales" USING btree ("_parent_id");
  CREATE INDEX "_container_specs_v_parent_idx" ON "_container_specs_v" USING btree ("parent_id");
  CREATE INDEX "_container_specs_v_version_version_terminal_idx" ON "_container_specs_v" USING btree ("version_terminal_id");
  CREATE INDEX "_container_specs_v_version_version_updated_at_idx" ON "_container_specs_v" USING btree ("version_updated_at");
  CREATE INDEX "_container_specs_v_version_version_created_at_idx" ON "_container_specs_v" USING btree ("version_created_at");
  CREATE INDEX "_container_specs_v_version_version__status_idx" ON "_container_specs_v" USING btree ("version__status");
  CREATE INDEX "_container_specs_v_created_at_idx" ON "_container_specs_v" USING btree ("created_at");
  CREATE INDEX "_container_specs_v_updated_at_idx" ON "_container_specs_v" USING btree ("updated_at");
  CREATE INDEX "_container_specs_v_snapshot_idx" ON "_container_specs_v" USING btree ("snapshot");
  CREATE INDEX "_container_specs_v_published_locale_idx" ON "_container_specs_v" USING btree ("published_locale");
  CREATE INDEX "_container_specs_v_latest_idx" ON "_container_specs_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_container_specs_v_locales_locale_parent_id_unique" ON "_container_specs_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_container_specs_v_locales_parent_id_idx" ON "_container_specs_v_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "services_slug_idx" ON "services" USING btree ("slug");
  CREATE INDEX "services_terminal_idx" ON "services" USING btree ("terminal_id");
  CREATE INDEX "services_image_idx" ON "services" USING btree ("image_id");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE INDEX "services__status_idx" ON "services" USING btree ("_status");
  CREATE UNIQUE INDEX "services_locales_locale_parent_id_unique" ON "services_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_locales_parent_id_idx" ON "services_locales" USING btree ("_parent_id");
  CREATE INDEX "_services_v_parent_idx" ON "_services_v" USING btree ("parent_id");
  CREATE INDEX "_services_v_version_version_slug_idx" ON "_services_v" USING btree ("version_slug");
  CREATE INDEX "_services_v_version_version_terminal_idx" ON "_services_v" USING btree ("version_terminal_id");
  CREATE INDEX "_services_v_version_version_image_idx" ON "_services_v" USING btree ("version_image_id");
  CREATE INDEX "_services_v_version_version_updated_at_idx" ON "_services_v" USING btree ("version_updated_at");
  CREATE INDEX "_services_v_version_version_created_at_idx" ON "_services_v" USING btree ("version_created_at");
  CREATE INDEX "_services_v_version_version__status_idx" ON "_services_v" USING btree ("version__status");
  CREATE INDEX "_services_v_created_at_idx" ON "_services_v" USING btree ("created_at");
  CREATE INDEX "_services_v_updated_at_idx" ON "_services_v" USING btree ("updated_at");
  CREATE INDEX "_services_v_snapshot_idx" ON "_services_v" USING btree ("snapshot");
  CREATE INDEX "_services_v_published_locale_idx" ON "_services_v" USING btree ("published_locale");
  CREATE INDEX "_services_v_latest_idx" ON "_services_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_services_v_locales_locale_parent_id_unique" ON "_services_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_locales_parent_id_idx" ON "_services_v_locales" USING btree ("_parent_id");
  CREATE INDEX "fleet_items_photo_idx" ON "fleet_items" USING btree ("photo_id");
  CREATE INDEX "fleet_items_updated_at_idx" ON "fleet_items" USING btree ("updated_at");
  CREATE INDEX "fleet_items_created_at_idx" ON "fleet_items" USING btree ("created_at");
  CREATE INDEX "fleet_items__status_idx" ON "fleet_items" USING btree ("_status");
  CREATE UNIQUE INDEX "fleet_items_locales_locale_parent_id_unique" ON "fleet_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "fleet_items_locales_parent_id_idx" ON "fleet_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_fleet_items_v_parent_idx" ON "_fleet_items_v" USING btree ("parent_id");
  CREATE INDEX "_fleet_items_v_version_version_photo_idx" ON "_fleet_items_v" USING btree ("version_photo_id");
  CREATE INDEX "_fleet_items_v_version_version_updated_at_idx" ON "_fleet_items_v" USING btree ("version_updated_at");
  CREATE INDEX "_fleet_items_v_version_version_created_at_idx" ON "_fleet_items_v" USING btree ("version_created_at");
  CREATE INDEX "_fleet_items_v_version_version__status_idx" ON "_fleet_items_v" USING btree ("version__status");
  CREATE INDEX "_fleet_items_v_created_at_idx" ON "_fleet_items_v" USING btree ("created_at");
  CREATE INDEX "_fleet_items_v_updated_at_idx" ON "_fleet_items_v" USING btree ("updated_at");
  CREATE INDEX "_fleet_items_v_snapshot_idx" ON "_fleet_items_v" USING btree ("snapshot");
  CREATE INDEX "_fleet_items_v_published_locale_idx" ON "_fleet_items_v" USING btree ("published_locale");
  CREATE INDEX "_fleet_items_v_latest_idx" ON "_fleet_items_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_fleet_items_v_locales_locale_parent_id_unique" ON "_fleet_items_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_fleet_items_v_locales_parent_id_idx" ON "_fleet_items_v_locales" USING btree ("_parent_id");
  CREATE INDEX "routes_updated_at_idx" ON "routes" USING btree ("updated_at");
  CREATE INDEX "routes_created_at_idx" ON "routes" USING btree ("created_at");
  CREATE INDEX "routes__status_idx" ON "routes" USING btree ("_status");
  CREATE UNIQUE INDEX "routes_locales_locale_parent_id_unique" ON "routes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "routes_locales_parent_id_idx" ON "routes_locales" USING btree ("_parent_id");
  CREATE INDEX "_routes_v_parent_idx" ON "_routes_v" USING btree ("parent_id");
  CREATE INDEX "_routes_v_version_version_updated_at_idx" ON "_routes_v" USING btree ("version_updated_at");
  CREATE INDEX "_routes_v_version_version_created_at_idx" ON "_routes_v" USING btree ("version_created_at");
  CREATE INDEX "_routes_v_version_version__status_idx" ON "_routes_v" USING btree ("version__status");
  CREATE INDEX "_routes_v_created_at_idx" ON "_routes_v" USING btree ("created_at");
  CREATE INDEX "_routes_v_updated_at_idx" ON "_routes_v" USING btree ("updated_at");
  CREATE INDEX "_routes_v_snapshot_idx" ON "_routes_v" USING btree ("snapshot");
  CREATE INDEX "_routes_v_published_locale_idx" ON "_routes_v" USING btree ("published_locale");
  CREATE INDEX "_routes_v_latest_idx" ON "_routes_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_routes_v_locales_locale_parent_id_unique" ON "_routes_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_routes_v_locales_parent_id_idx" ON "_routes_v_locales" USING btree ("_parent_id");
  CREATE INDEX "tariffs_service_idx" ON "tariffs" USING btree ("service_id");
  CREATE INDEX "tariffs_updated_at_idx" ON "tariffs" USING btree ("updated_at");
  CREATE INDEX "tariffs_created_at_idx" ON "tariffs" USING btree ("created_at");
  CREATE INDEX "tariffs__status_idx" ON "tariffs" USING btree ("_status");
  CREATE UNIQUE INDEX "tariffs_locales_locale_parent_id_unique" ON "tariffs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "tariffs_locales_parent_id_idx" ON "tariffs_locales" USING btree ("_parent_id");
  CREATE INDEX "_tariffs_v_parent_idx" ON "_tariffs_v" USING btree ("parent_id");
  CREATE INDEX "_tariffs_v_version_version_service_idx" ON "_tariffs_v" USING btree ("version_service_id");
  CREATE INDEX "_tariffs_v_version_version_updated_at_idx" ON "_tariffs_v" USING btree ("version_updated_at");
  CREATE INDEX "_tariffs_v_version_version_created_at_idx" ON "_tariffs_v" USING btree ("version_created_at");
  CREATE INDEX "_tariffs_v_version_version__status_idx" ON "_tariffs_v" USING btree ("version__status");
  CREATE INDEX "_tariffs_v_created_at_idx" ON "_tariffs_v" USING btree ("created_at");
  CREATE INDEX "_tariffs_v_updated_at_idx" ON "_tariffs_v" USING btree ("updated_at");
  CREATE INDEX "_tariffs_v_snapshot_idx" ON "_tariffs_v" USING btree ("snapshot");
  CREATE INDEX "_tariffs_v_published_locale_idx" ON "_tariffs_v" USING btree ("published_locale");
  CREATE INDEX "_tariffs_v_latest_idx" ON "_tariffs_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_tariffs_v_locales_locale_parent_id_unique" ON "_tariffs_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_tariffs_v_locales_parent_id_idx" ON "_tariffs_v_locales" USING btree ("_parent_id");
  CREATE INDEX "leads_services_order_idx" ON "leads_services" USING btree ("order");
  CREATE INDEX "leads_services_parent_idx" ON "leads_services" USING btree ("parent_id");
  CREATE UNIQUE INDEX "leads_submission_id_idx" ON "leads" USING btree ("submission_id");
  CREATE INDEX "leads_assigned_to_idx" ON "leads" USING btree ("assigned_to_id");
  CREATE INDEX "leads_updated_at_idx" ON "leads" USING btree ("updated_at");
  CREATE INDEX "leads_created_at_idx" ON "leads" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_terminals_id_idx" ON "payload_locked_documents_rels" USING btree ("terminals_id");
  CREATE INDEX "payload_locked_documents_rels_warehouse_details_id_idx" ON "payload_locked_documents_rels" USING btree ("warehouse_details_id");
  CREATE INDEX "payload_locked_documents_rels_container_specs_id_idx" ON "payload_locked_documents_rels" USING btree ("container_specs_id");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_fleet_items_id_idx" ON "payload_locked_documents_rels" USING btree ("fleet_items_id");
  CREATE INDEX "payload_locked_documents_rels_routes_id_idx" ON "payload_locked_documents_rels" USING btree ("routes_id");
  CREATE INDEX "payload_locked_documents_rels_tariffs_id_idx" ON "payload_locked_documents_rels" USING btree ("tariffs_id");
  CREATE INDEX "payload_locked_documents_rels_leads_id_idx" ON "payload_locked_documents_rels" USING btree ("leads_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_settings_social_links_order_idx" ON "site_settings_social_links" USING btree ("_order");
  CREATE INDEX "site_settings_social_links_parent_id_idx" ON "site_settings_social_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "site_settings_social_links_locales_locale_parent_id_unique" ON "site_settings_social_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_settings_social_links_locales_parent_id_idx" ON "site_settings_social_links_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "site_settings_locales_locale_parent_id_unique" ON "site_settings_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_settings_locales_parent_id_idx" ON "site_settings_locales" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_locales" CASCADE;
  DROP TABLE "terminals_photos" CASCADE;
  DROP TABLE "terminals_photos_locales" CASCADE;
  DROP TABLE "terminals" CASCADE;
  DROP TABLE "terminals_locales" CASCADE;
  DROP TABLE "_terminals_v_version_photos" CASCADE;
  DROP TABLE "_terminals_v_version_photos_locales" CASCADE;
  DROP TABLE "_terminals_v" CASCADE;
  DROP TABLE "_terminals_v_locales" CASCADE;
  DROP TABLE "warehouse_details_zones" CASCADE;
  DROP TABLE "warehouse_details_zones_locales" CASCADE;
  DROP TABLE "warehouse_details" CASCADE;
  DROP TABLE "warehouse_details_locales" CASCADE;
  DROP TABLE "_warehouse_details_v_version_zones" CASCADE;
  DROP TABLE "_warehouse_details_v_version_zones_locales" CASCADE;
  DROP TABLE "_warehouse_details_v" CASCADE;
  DROP TABLE "_warehouse_details_v_locales" CASCADE;
  DROP TABLE "container_specs_operations" CASCADE;
  DROP TABLE "container_specs_operations_locales" CASCADE;
  DROP TABLE "container_specs" CASCADE;
  DROP TABLE "container_specs_locales" CASCADE;
  DROP TABLE "_container_specs_v_version_operations" CASCADE;
  DROP TABLE "_container_specs_v_version_operations_locales" CASCADE;
  DROP TABLE "_container_specs_v" CASCADE;
  DROP TABLE "_container_specs_v_locales" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "services_locales" CASCADE;
  DROP TABLE "_services_v" CASCADE;
  DROP TABLE "_services_v_locales" CASCADE;
  DROP TABLE "fleet_items" CASCADE;
  DROP TABLE "fleet_items_locales" CASCADE;
  DROP TABLE "_fleet_items_v" CASCADE;
  DROP TABLE "_fleet_items_v_locales" CASCADE;
  DROP TABLE "routes" CASCADE;
  DROP TABLE "routes_locales" CASCADE;
  DROP TABLE "_routes_v" CASCADE;
  DROP TABLE "_routes_v_locales" CASCADE;
  DROP TABLE "tariffs" CASCADE;
  DROP TABLE "tariffs_locales" CASCADE;
  DROP TABLE "_tariffs_v" CASCADE;
  DROP TABLE "_tariffs_v_locales" CASCADE;
  DROP TABLE "leads_services" CASCADE;
  DROP TABLE "leads" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings_social_links" CASCADE;
  DROP TABLE "site_settings_social_links_locales" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "site_settings_locales" CASCADE;
  DROP TABLE "email_settings" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_pages_slug";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_version_slug";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum__pages_v_published_locale";
  DROP TYPE "public"."enum_terminals_type";
  DROP TYPE "public"."enum_terminals_status";
  DROP TYPE "public"."enum__terminals_v_version_type";
  DROP TYPE "public"."enum__terminals_v_version_status";
  DROP TYPE "public"."enum__terminals_v_published_locale";
  DROP TYPE "public"."enum_warehouse_details_zones_area_unit";
  DROP TYPE "public"."enum_warehouse_details_zones_volume_unit";
  DROP TYPE "public"."enum_warehouse_details_area_unit";
  DROP TYPE "public"."enum_warehouse_details_volume_unit";
  DROP TYPE "public"."enum_warehouse_details_status";
  DROP TYPE "public"."enum__warehouse_details_v_version_zones_area_unit";
  DROP TYPE "public"."enum__warehouse_details_v_version_zones_volume_unit";
  DROP TYPE "public"."enum__warehouse_details_v_version_area_unit";
  DROP TYPE "public"."enum__warehouse_details_v_version_volume_unit";
  DROP TYPE "public"."enum__warehouse_details_v_version_status";
  DROP TYPE "public"."enum__warehouse_details_v_published_locale";
  DROP TYPE "public"."enum_container_specs_status";
  DROP TYPE "public"."enum__container_specs_v_version_status";
  DROP TYPE "public"."enum__container_specs_v_published_locale";
  DROP TYPE "public"."enum_services_category";
  DROP TYPE "public"."enum_services_status";
  DROP TYPE "public"."enum__services_v_version_category";
  DROP TYPE "public"."enum__services_v_version_status";
  DROP TYPE "public"."enum__services_v_published_locale";
  DROP TYPE "public"."enum_fleet_items_payload_unit";
  DROP TYPE "public"."enum_fleet_items_volume_unit";
  DROP TYPE "public"."enum_fleet_items_status";
  DROP TYPE "public"."enum__fleet_items_v_version_payload_unit";
  DROP TYPE "public"."enum__fleet_items_v_version_volume_unit";
  DROP TYPE "public"."enum__fleet_items_v_version_status";
  DROP TYPE "public"."enum__fleet_items_v_published_locale";
  DROP TYPE "public"."enum_routes_status";
  DROP TYPE "public"."enum__routes_v_version_status";
  DROP TYPE "public"."enum__routes_v_published_locale";
  DROP TYPE "public"."enum_tariffs_category";
  DROP TYPE "public"."enum_tariffs_currency";
  DROP TYPE "public"."enum_tariffs_status";
  DROP TYPE "public"."enum__tariffs_v_version_category";
  DROP TYPE "public"."enum__tariffs_v_version_currency";
  DROP TYPE "public"."enum__tariffs_v_version_status";
  DROP TYPE "public"."enum__tariffs_v_published_locale";
  DROP TYPE "public"."enum_leads_services";
  DROP TYPE "public"."enum_leads_status";
  DROP TYPE "public"."enum_leads_notification_status";`)
}
