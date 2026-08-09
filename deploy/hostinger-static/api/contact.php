<?php
// Static fallback intentionally requires a private, client-approved SMTP setup.
// Do not add credentials under public_html or commit them to source control.
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
http_response_code(503);
echo json_encode(['ok' => false, 'message' => 'Contact service requires approved production configuration.']);
