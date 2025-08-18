INSERT INTO
  `eco_user_role` (`name`, `permissions`)
VALUES
  ('超级管理员', '["*"]'),
  (
    '游客',
    '["dashboard:list","goods:category:list","goods:list:list","goods:stock:list","gift:category:list","gift:list:list","order:list:list","order:credit:list","order:sale:list","promotion:coupon:list","promotion:activity-coupon:list","promotion:distribute-coupon:list","user:list:list","user:blocklist:list","permission:menu:list","permission:role:list","permission:account:list","log:operation:list","log:migration:list","setting:user:list","setting:protocol:list","setting:order:list","setting:hotkeyword:list","setting:adv:list","setting:express:list"]'
  );